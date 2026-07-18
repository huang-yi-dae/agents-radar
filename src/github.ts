/**
 * GitHub API types and fetch helpers.
 * Reads GITHUB_TOKEN and DIGEST_REPO from environment at call time.
 *
 * LEARNING NOTES:
 * - This module handles ALL GitHub API interactions: fetching issues, PRs, releases,
 *   skills data, and creating GitHub Issues.
 * - It uses the native `fetch()` API (available in Node.js 18+) — no axios needed.
 * - The GitHub REST API returns JSON responses that we type with TypeScript interfaces.
 *
 * KEY CONCEPTS:
 * - `export interface`: defines a type that other modules can import and use.
 * - `export async function`: async functions return Promises — callers use `await`.
 * - `Record<string, string>`: a type for objects with string keys and string values.
 * - Template literal types in URL construction: `https://api.github.com/repos/${repo}/...`
 * - The `Authorization: Bearer ${token}` header authenticates API requests.
 * - GitHub API rate limit: 5000 requests/hour for authenticated users.
 */

// ---------------------------------------------------------------------------
// Types — these describe the shape of GitHub API responses
// ---------------------------------------------------------------------------

/**
 * Configuration for a single tracked repository.
 * Loaded from config.yml via config.ts, or used directly.
 *
 * PROPERTIES:
 * - id: Short identifier used in filenames (e.g. "claude-code" → "ai-cli.md")
 * - repo: GitHub "owner/repo" slug (e.g. "anthropics/claude-code")
 * - name: Human-readable display name (e.g. "Claude Code")
 * - paginated?: If true, fetch multiple pages (100 items/page) until `since` is reached.
 *   Use for high-volume repos with many daily updates (like openclaw/openclaw).
 */
export interface RepoConfig {
  id: string;
  repo: string;
  name: string;
  paginated?: boolean;
}

/**
 * Minimal GitHub user representation.
 * The full API response has many more fields — we only need `login`.
 */
export interface GitHubUser {
  login: string;
}

/**
 * GitHub label attached to an issue or PR.
 */
export interface GitHubLabel {
  name: string;
}

/**
 * GitHub reactions summary. We only track 👍 (+1) reactions.
 */
export interface GitHubReactions {
  "+1": number;
}

/**
 * A GitHub Issue or Pull Request item.
 *
 * PROPERTIES:
 * - number: Issue/PR number (e.g. 1234)
 * - title: The title text
 * - state: "open" or "closed"
 * - user: The author (GitHubUser with login)
 * - labels: Array of labels attached
 * - created_at / updated_at: ISO 8601 timestamp strings
 * - comments: Number of comments
 * - reactions?: Optional reactions summary
 * - body?: Optional body text (can be null)
 * - html_url: The web URL (e.g. "https://github.com/owner/repo/issues/123")
 * - pull_request?: If present, this item is a PR (even if fetched from /issues endpoint).
 *   This is important because GitHub's /issues endpoint returns BOTH issues AND PRs.
 */
export interface GitHubItem {
  number: number;
  title: string;
  state: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  created_at: string;
  updated_at: string;
  comments: number;
  reactions?: GitHubReactions;
  body?: string | null;
  html_url: string;
  pull_request?: unknown; // `unknown` means "we don't care about the shape, just that it exists"
}

/**
 * A GitHub Release.
 */
export interface GitHubRelease {
  tag_name: string;
  name: string;
  body?: string | null;
  published_at: string;
}

/**
 * The result of fetching a repo's recent activity.
 * Bundles the config with the fetched data for easy passing between phases.
 *
 * PROPERTIES:
 * - cfg: The RepoConfig that was used for the fetch
 * - issues: Array of recent issues (filtered to exclude PRs)
 * - prs: Array of recent pull requests
 * - releases: Array of recent releases
 */
export interface RepoFetch {
  cfg: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
}

// ---------------------------------------------------------------------------
// Internals — private helper functions
// ---------------------------------------------------------------------------

/** Maximum pages to fetch for paginated repos (100 items per page × 5 pages = 500 max). */
const MAX_PAGES = 5;

/**
 * Build the HTTP headers for GitHub API requests.
 *
 * HOW IT WORKS:
 * - `Authorization: Bearer ${token}` — authenticates the request.
 * - `Accept: application/vnd.github+json` — requests the GitHub JSON format.
 * - `X-GitHub-Api-Version: 2022-11-28` — pins the API version for stability.
 *
 * NOTE: This is a function (not a constant) because it reads `process.env` at call time.
 * If it were a constant, the token would be captured at module load time.
 *
 * @returns An object with the required headers
 */
function headers(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env["GITHUB_TOKEN"] ?? ""}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/**
 * Generic GitHub API GET request.
 *
 * HOW IT WORKS:
 * 1. Create a URL object from the endpoint string.
 * 2. Append query parameters (e.g. `?state=all&sort=updated`).
 * 3. Make an HTTP GET request with auth headers.
 * 4. Check if the response is OK (status 200-299).
 * 5. Parse the JSON response and cast it to type T.
 *
 * GENERIC TYPE `<T>`:
 * - The caller specifies what type the JSON response should be.
 * - Example: `githubGet<GitHubItem[]>("...")` expects the response to be an array of GitHubItem.
 * - TypeScript doesn't validate this at runtime — it's a promise to the compiler.
 *
 * @param url - The GitHub API endpoint URL
 * @param params - Query parameters as key-value pairs
 * @returns The parsed JSON response, typed as T
 */
async function githubGet<T>(url: string, params: Record<string, string> = {}): Promise<T> {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const resp = await fetch(u.toString(), { headers: headers() });
  if (!resp.ok) throw new Error(`GitHub API error ${resp.status} (${url}): ${await resp.text()}`);
  return resp.json() as Promise<T>;
}

/**
 * Fetch a single page of issues or PRs.
 *
 * HOW IT WORKS:
 * - Builds query parameters: state=all (open+closed), sort=updated, per_page=100.
 * - For issues: adds `since` parameter (GitHub API supports filtering by update time).
 * - For pulls: the /pulls endpoint doesn't support `since`, so we filter client-side.
 *
 * NOTE: The `itemType` parameter determines the endpoint:
 * - "issues" → /repos/{owner}/{repo}/issues (returns both issues AND PRs)
 * - "pulls" → /repos/{owner}/{repo}/pulls (returns only PRs)
 */
async function fetchItemPage(
  repo: string,
  itemType: "issues" | "pulls",
  since: Date,
  page: number,
): Promise<GitHubItem[]> {
  const params: Record<string, string> = {
    state: "all",
    sort: "updated",
    direction: "desc",
    per_page: "100",
    page: String(page),
  };
  // /pulls does not support `since`; filter client-side instead
  if (itemType === "issues") params["since"] = since.toISOString();

  const items = await githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/${itemType}`, params);
  return itemType === "pulls" ? items.filter((i) => new Date(i.updated_at) >= since) : items;
}

// ---------------------------------------------------------------------------
// Exports — public API
// ---------------------------------------------------------------------------

/**
 * Fetch items updated since `since`.
 *
 * TWO MODES:
 * 1. Regular repos (paginated=false): Single API call, up to 50 items.
 * 2. Paginated repos (paginated=true): Multiple API calls, up to MAX_PAGES pages.
 *    Stops when: (a) a page ends before `since`, (b) MAX_PAGES reached, or (c) page < 100 items.
 *
 * HOW IT WORKS:
 * - Non-paginated: one GET with per_page=50, filter client-side for pulls.
 * - Paginated: loop from page 1 to MAX_PAGES, accumulating items.
 *   Break early if: no items, last item is older than `since`, or page isn't full.
 *
 * @param cfg - Repository configuration (determines paginated vs regular)
 * @param itemType - "issues" or "pulls"
 * @param since - Only return items updated after this Date
 * @returns Array of GitHubItem objects
 */
export async function fetchRecentItems(
  cfg: RepoConfig,
  itemType: "issues" | "pulls",
  since: Date,
): Promise<GitHubItem[]> {
  if (!cfg.paginated) {
    // Non-paginated: single page of 50 items
    const params: Record<string, string> = {
      state: "all",
      sort: "updated",
      direction: "desc",
      per_page: "50",
    };
    if (itemType === "issues") params["since"] = since.toISOString();
    const items = await githubGet<GitHubItem[]>(
      `https://api.github.com/repos/${cfg.repo}/${itemType}`,
      params,
    );
    return itemType === "pulls" ? items.filter((i) => new Date(i.updated_at) >= since) : items;
  }

  // Paginated: fetch multiple pages
  const all: GitHubItem[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const items = await fetchItemPage(cfg.repo, itemType, since, page);
    if (items.length === 0) break; // no more items
    all.push(...items);
    const last = items[items.length - 1];
    if (last && new Date(last.updated_at) < since) break; // reached items older than `since`
    if (items.length < 100) break; // last page (fewer than per_page)
  }
  return all;
}

/**
 * Fetch recent releases for a repo.
 *
 * HOW IT WORKS:
 * - GET /repos/{owner}/{repo}/releases?per_page=10
 * - Filter to only releases published after `since`.
 * - Releases are sorted by `published_at` desc by default from the API.
 *
 * @param repo - "owner/repo" slug
 * @param since - Only return releases published after this Date
 * @returns Array of GitHubRelease objects
 */
export async function fetchRecentReleases(repo: string, since: Date): Promise<GitHubRelease[]> {
  const releases = await githubGet<GitHubRelease[]>(`https://api.github.com/repos/${repo}/releases`, {
    per_page: "10",
  });
  return releases.filter((r) => new Date(r.published_at) >= since);
}

/**
 * Ensure a GitHub label exists on the digest repo. Creates it if missing.
 *
 * HOW IT WORKS:
 * - POST /repos/{digestRepo}/labels with { name, color }.
 * - If the label already exists, GitHub returns 422 (Unprocessable Entity) — we treat that as success.
 * - Any other error is thrown.
 *
 * @param name - Label name
 * @param color - Hex color without # (e.g. "e11d48" for red)
 */
export async function ensureLabel(name: string, color: string): Promise<void> {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const resp = await fetch(`https://api.github.com/repos/${digestRepo}/labels`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  if (!resp.ok && resp.status !== 422) {
    throw new Error(`Failed to create label "${name}": ${await resp.text()}`);
  }
}

/**
 * Fetch trending skills data from a skills repo (e.g. anthropics/skills).
 *
 * HOW IT WORKS:
 * - Fetches TWO lists in parallel using Promise.all:
 *   1. Open PRs sorted by "popularity" (comment count) — these are community-submitted skills.
 *   2. All issues sorted by "comments" — these are feature requests and bug reports.
 * - No `since` filter — we want all-time hot items, not just the last 24h.
 * - Filters out PRs from the issues list (GitHub's /issues endpoint returns both).
 *
 * @param repo - Repository slug (e.g. "anthropics/skills")
 * @returns Object with `prs` and `issues` arrays
 */
export async function fetchSkillsData(repo: string): Promise<{ prs: GitHubItem[]; issues: GitHubItem[] }> {
  const [prs, issuesRaw] = await Promise.all([
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/pulls`, {
      state: "open",
      sort: "popularity",
      direction: "desc",
      per_page: "50",
    }),
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/issues`, {
      state: "all",
      sort: "comments",
      direction: "desc",
      per_page: "50",
    }),
  ]);
  // Filter out PRs from issues (GitHub's /issues endpoint returns both)
  return { prs, issues: issuesRaw.filter((i) => !i.pull_request) };
}

/** GitHub Issue body character limit. */
const GITHUB_ISSUE_BODY_LIMIT = 65536;

/** Notice appended when content is truncated to fit the Issue body limit. */
const TRUNCATION_NOTICE = "\n\n---\n> ⚠️ 内容超过 GitHub Issue 上限，完整报告见提交的 Markdown 文件。";

/**
 * GitHub label colors by label name. Default: "0075ca" (blue).
 * Colors are hex values without the # prefix.
 */
const LABEL_COLORS: Record<string, string> = {
  openclaw: "e11d48", // red
  trending: "f9a825", // amber
  hn: "ff6600", // orange
  weekly: "7c3aed", // purple
  monthly: "0d9488", // teal
  "digest-en": "1d76db", // blue
  "openclaw-en": "f472b6", // pink
  "web-en": "6366f1", // indigo
  "trending-en": "fbbf24", // yellow
  "hn-en": "fb923c", // light orange
};

/**
 * Break GitHub URLs in issue body to prevent cross-repository references.
 *
 * WHY THIS EXISTS:
 * - GitHub auto-links URLs in Issue bodies and creates "mentioned this issue" backlinks.
 * - Since our reports contain many GitHub URLs to tracked repos, we'd create noisy
 *   cross-references on those repos.
 * - Solution: insert a zero-width space (\u200B) in "github.com" and after "@" mentions.
 *   The URL still looks normal to humans, but GitHub's auto-linker won't match it.
 *
 * @param text - The issue body text
 * @returns The text with neutralized GitHub references
 */
function neutralizeGitHubRefs(text: string): string {
  return (
    text
      // Prevent "mentioned this issue" cross-references
      .replace(/https:\/\/github\.com\//g, "https://github\u200B.com/")
      // Prevent @mention notifications — insert zero-width space after @
      .replace(/@([a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38})/g, "@\u200B$1")
  );
}

/**
 * Create a GitHub Issue on the digest repo.
 *
 * HOW IT WORKS:
 * 1. Neutralize GitHub references to prevent cross-repo backlinks.
 * 2. Truncate the body if it exceeds the GitHub Issue body limit (65536 chars).
 * 3. Ensure the label exists (create it if needed).
 * 4. POST to /repos/{digestRepo}/issues with { title, body, labels }.
 * 5. Return the Issue URL.
 *
 * @param title - Issue title
 * @param body - Issue body (Markdown)
 * @param label - Label to attach (e.g. "digest", "openclaw")
 * @returns The URL of the created Issue
 */
export async function createGitHubIssue(title: string, body: string, label: string): Promise<string> {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  body = neutralizeGitHubRefs(body);
  if (body.length > GITHUB_ISSUE_BODY_LIMIT) {
    body = body.slice(0, GITHUB_ISSUE_BODY_LIMIT - TRUNCATION_NOTICE.length) + TRUNCATION_NOTICE;
  }
  await ensureLabel(label, LABEL_COLORS[label] ?? "0075ca");
  const resp = await fetch(`https://api.github.com/repos/${digestRepo}/issues`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, labels: [label] }),
  });
  if (!resp.ok) throw new Error(`Failed to create issue: ${await resp.text()}`);
  const data = (await resp.json()) as { html_url: string };
  return data.html_url;
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This module handles all GitHub API interactions with 3 categories of exports:
// 1. Types: RepoConfig, GitHubItem, GitHubRelease, RepoFetch
// 2. Data fetchers: fetchRecentItems, fetchRecentReleases, fetchSkillsData
// 3. Issue creator: createGitHubIssue (with label management and URL neutralization)
//
// Key patterns:
// - Generic `githubGet<T>()` for type-safe API calls
// - Paginated vs non-paginated fetching based on RepoConfig.paginated
// - Client-side filtering for /pulls endpoint (doesn't support `since` parameter)
// - Zero-width space injection to prevent GitHub cross-references
//
// QUESTIONS TO TEST YOUR UNDERSTANDING:
// Q1: Why does fetchItemPage handle "issues" and "pulls" differently?
//     (Answer: The /pulls API doesn't support the `since` parameter, so we must
//      filter client-side by comparing updated_at timestamps)
// Q2: Why does neutralizeGitHubRefs use \u200B (zero-width space)?
//     (Answer: It breaks GitHub's URL auto-linker pattern while keeping the text
//      visually identical to humans)
// Q3: What happens if DIGEST_REPO env var is not set?
//     (Answer: createGitHubIssue will POST to an empty URL and fail;
//      the pipeline checks DIGEST_REPO before calling createGitHubIssue in index.ts)
// ─────────────────────────────────────────────────────────────────────────────
