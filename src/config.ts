/**
 * Loads and validates agents-radar configuration from config.yml.
 * Falls back to built-in defaults if the file is missing or a section is absent.
 *
 * LEARNING NOTES:
 * - This module demonstrates the "config with defaults" pattern: read a YAML file,
 *   validate each section, and fall back to hard-coded defaults if anything is missing.
 * - Uses `js-yaml` (a YAML parser) to convert YAML text → JavaScript objects.
 * - The `path.resolve()` call converts a relative path to an absolute path,
 *   which is required by `fs.existsSync()`.
 *
 * KEY CONCEPTS:
 * - `interface` in TypeScript: defines the shape of an object (its properties and types).
 * - `?` after a property name means it's optional (can be undefined).
 * - `as` keyword: type assertion — tells TypeScript "trust me, this value is this type".
 * - `??` (nullish coalescing): returns the right side if the left is null/undefined.
 * - `fs.existsSync()`: synchronous check if a file exists (returns boolean).
 * - `yaml.load()`: parses a YAML string into a JavaScript object.
 */

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { RepoConfig } from "./github.ts";

// ---------------------------------------------------------------------------
// Schema types — these define what the YAML file should look like
// ---------------------------------------------------------------------------

/**
 * Raw shape of a single repo entry from config.yml.
 * This is what the YAML parser returns — we validate and convert it to RepoConfig.
 *
 * PROPERTIES:
 * - id: Short string used for filenames (e.g. "claude-code")
 * - repo: GitHub "owner/repo" slug (e.g. "anthropics/claude-code")
 * - name: Human-readable display name (e.g. "Claude Code")
 * - paginated?: Optional boolean — if true, fetch multiple pages of issues/PRs
 */
interface RawRepoEntry {
  id: string;
  repo: string;
  name: string;
  paginated?: boolean;
}

/**
 * Raw shape of the entire config.yml file.
 * All sections are optional — missing sections fall back to defaults.
 *
 * PROPERTIES:
 * - cli_repos?: Array of CLI tool repos to track
 * - skills_repo?: The Claude Code Skills repository slug
 * - openclaw?: The main OpenClaw project config
 * - openclaw_peers?: Array of peer project repos
 */
interface RawConfig {
  cli_repos?: RawRepoEntry[];
  skills_repo?: string;
  openclaw?: RawRepoEntry;
  openclaw_peers?: RawRepoEntry[];
}

/**
 * Validated, normalized configuration used by the rest of the app.
 * This is the "clean" version of RawConfig after validation + defaults.
 *
 * PROPERTIES:
 * - cliRepos: Array of RepoConfig objects (from github.ts)
 * - skillsRepo: Repository slug string
 * - openclaw: Single RepoConfig object
 * - openclawPeers: Array of RepoConfig objects
 */
export interface RadarConfig {
  cliRepos: RepoConfig[];
  skillsRepo: string;
  openclaw: RepoConfig;
  openclawPeers: RepoConfig[];
}

// ---------------------------------------------------------------------------
// Defaults (mirrors the original hard-coded values)
// These are used when config.yml is missing or a section is empty.
// ---------------------------------------------------------------------------

/** Default CLI repos to track if config.yml doesn't specify any. */
const DEFAULT_CLI_REPOS: RepoConfig[] = [
  { id: "claude-code", repo: "anthropics/claude-code", name: "Claude Code" },
  { id: "codex", repo: "openai/codex", name: "OpenAI Codex" },
  { id: "gemini-cli", repo: "google-gemini/gemini-cli", name: "Gemini CLI" },
  { id: "copilot-cli", repo: "github/copilot-cli", name: "GitHub Copilot CLI" },
  { id: "kimi-cli", repo: "MoonshotAI/kimi-cli", name: "Kimi Code CLI" },
  { id: "opencode", repo: "anomalyco/opencode", name: "OpenCode" },
  { id: "qwen-code", repo: "QwenLM/qwen-code", name: "Qwen Code" },
];

/** Default skills repository. */
const DEFAULT_SKILLS_REPO = "anthropics/skills";

/** Default OpenClaw config. Note `paginated: true` — high-volume repo needs multi-page fetches. */
const DEFAULT_OPENCLAW: RepoConfig = {
  id: "openclaw",
  repo: "openclaw/openclaw",
  name: "OpenClaw",
  paginated: true,
};

/** Default peer projects for the OpenClaw ecosystem comparison. */
const DEFAULT_OPENCLAW_PEERS: RepoConfig[] = [
  { id: "nanobot", repo: "HKUDS/nanobot", name: "NanoBot", paginated: true },
  { id: "zeroclaw", repo: "zeroclaw-labs/zeroclaw", name: "Zeroclaw" },
  { id: "picoclaw", repo: "sipeed/picoclaw", name: "PicoClaw", paginated: true },
  { id: "nanoclaw", repo: "qwibitai/nanoclaw", name: "NanoClaw" },
  { id: "nullclaw", repo: "nullclaw/nullclaw", name: "NullClaw" },
  { id: "ironclaw", repo: "nearai/ironclaw", name: "IronClaw" },
  { id: "lobsterai", repo: "netease-youdao/LobsterAI", name: "LobsterAI" },
  { id: "tinyclaw", repo: "TinyAGI/tinyclaw", name: "TinyClaw" },
  { id: "copaw", repo: "agentscope-ai/CoPaw", name: "CoPaw" },
  { id: "moltis", repo: "moltis-org/moltis", name: "Moltis" },
  { id: "zeptoclaw", repo: "qhkm/zeptoclaw", name: "ZeptoClaw" },
  { id: "easyclaw", repo: "gaoyangz77/easyclaw", name: "EasyClaw" },
];

// ---------------------------------------------------------------------------
// Loader
// ---------------------------------------------------------------------------

/**
 * Convert a raw YAML entry to a validated RepoConfig.
 *
 * HOW IT WORKS:
 * - Takes a RawRepoEntry and builds a RepoConfig object.
 * - The spread `...(e.paginated ? { paginated: true } : {})` conditionally
 *   includes the `paginated` property only when it's truthy.
 *   This keeps the object clean (no `paginated: false` or `paginated: undefined`).
 *
 * @param e - Raw entry from YAML
 * @returns Clean RepoConfig object
 */
export function toRepoConfig(e: RawRepoEntry): RepoConfig {
  return { id: e.id, repo: e.repo, name: e.name, ...(e.paginated ? { paginated: true } : {}) };
}

/**
 * Load configuration from config.yml, falling back to defaults.
 *
 * HOW IT WORKS:
 * 1. `path.resolve(configPath)` — convert relative path to absolute.
 * 2. `fs.existsSync(resolved)` — check if the file exists.
 * 3. If missing: log a message and return all defaults.
 * 4. If present: read the file, parse YAML, validate each section.
 * 5. For each section: if the YAML has valid data, use it; otherwise use the default.
 *
 * VALIDATION LOGIC:
 * - `Array.isArray(raw?.cli_repos) && raw.cli_repos.length > 0` — must be a non-empty array.
 * - `typeof raw?.skills_repo === "string" && raw.skills_repo.trim()` — must be a non-empty string.
 * - `raw?.openclaw?.id && raw.openclaw.repo` — must have both id and repo.
 *
 * The `?.` (optional chaining) operator safely accesses nested properties:
 * if `raw` is null/undefined, `raw?.cli_repos` returns undefined instead of throwing.
 *
 * @param configPath - Path to the YAML config file (default: "config.yml")
 * @returns A validated RadarConfig object
 */
export function loadConfig(configPath = "config.yml"): RadarConfig {
  const resolved = path.resolve(configPath);

  if (!fs.existsSync(resolved)) {
    console.log(`[config] ${configPath} not found — using built-in defaults.`);
    return {
      cliRepos: DEFAULT_CLI_REPOS,
      skillsRepo: DEFAULT_SKILLS_REPO,
      openclaw: DEFAULT_OPENCLAW,
      openclawPeers: DEFAULT_OPENCLAW_PEERS,
    };
  }

  // yaml.load() parses the YAML string into a JavaScript object.
  // `as RawConfig` is a type assertion — we tell TypeScript the shape we expect.
  const raw = yaml.load(fs.readFileSync(resolved, "utf-8")) as RawConfig;

  // Validate and use cli_repos from YAML, or fall back to defaults
  const cliRepos =
    Array.isArray(raw?.cli_repos) && raw.cli_repos.length > 0
      ? raw.cli_repos.map(toRepoConfig) // convert each raw entry
      : DEFAULT_CLI_REPOS;

  // Validate and use skills_repo from YAML, or fall back to default
  const skillsRepo =
    typeof raw?.skills_repo === "string" && raw.skills_repo.trim()
      ? raw.skills_repo.trim()
      : DEFAULT_SKILLS_REPO;

  // Validate and use openclaw from YAML, or fall back to default
  const openclaw = raw?.openclaw?.id && raw.openclaw.repo ? toRepoConfig(raw.openclaw) : DEFAULT_OPENCLAW;

  // Validate and use openclaw_peers from YAML, or fall back to defaults
  const openclawPeers =
    Array.isArray(raw?.openclaw_peers) && raw.openclaw_peers.length > 0
      ? raw.openclaw_peers.map(toRepoConfig)
      : DEFAULT_OPENCLAW_PEERS;

  console.log(
    `[config] Loaded from ${configPath}: ` +
      `${cliRepos.length} CLI repos, ${openclawPeers.length} OpenClaw peers`,
  );

  return { cliRepos, skillsRepo, openclaw, openclawPeers };
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// This module handles configuration loading with 3 key concepts:
// 1. YAML parsing with js-yaml (yaml.load → JavaScript object)
// 2. Validation with fallback defaults (every section has a default)
// 3. Type-safe conversion from raw YAML shapes to clean RepoConfig objects
//
// QUESTIONS TO TEST YOUR UNDERSTANDING:
// Q1: What happens if config.yml exists but cli_repos is an empty array []?
//     (Answer: Falls back to DEFAULT_CLI_REPOS because `raw.cli_repos.length > 0` is false)
// Q2: Why does toRepoConfig use a conditional spread `...(e.paginated ? { paginated: true } : {})`
//     instead of just `paginated: e.paginated`?
//     (Answer: To avoid setting `paginated: undefined` or `paginated: false` — only include
//      the property when it's explicitly true)
// Q3: What's the difference between `RawConfig` and `RadarConfig`?
//     (Answer: RawConfig is the raw YAML shape with optional fields;
//      RadarConfig is the validated, normalized version with guaranteed values)
// ─────────────────────────────────────────────────────────────────────────────
