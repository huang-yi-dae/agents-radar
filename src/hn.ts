/**
 * Hacker News AI stories fetched via the Algolia HN Search API.
 *
 * LEARNING NOTES:
 * - The Algolia HN Search API provides a free, fast way to search Hacker News.
 * - We run 6 parallel queries (one per search term) and deduplicate by story ID.
 * - Results are sorted by points (most popular first), then truncated to top 30.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single Hacker News story. */
export interface HnStory {
  id: string;
  title: string;
  url: string; // external URL, or HN discussion link if no external URL
  hnUrl: string; // always the HN discussion link
  points: number;
  comments: number;
  author: string;
  createdAt: string;
}

/** Combined HN data. */
export interface HnData {
  stories: HnStory[];
  fetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Number of top stories to include in the report. */
const HN_TOP_STORIES = 30;

/** Search queries — each is run in parallel. Results are deduped by story ID. */
const QUERIES = ["AI", "LLM", "Claude", "OpenAI", "Anthropic", "machine learning"];

// ---------------------------------------------------------------------------
// Algolia API types
// ---------------------------------------------------------------------------

/** A single hit from the Algolia API response. */
interface AlgoliaHit {
  objectID: string;
  title: string;
  url?: string;
  points: number;
  num_comments: number;
  author: string;
  created_at: string;
}

/** The Algolia API response wrapper. */
interface AlgoliaResponse {
  hits: AlgoliaHit[];
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

/**
 * Fetch top AI stories from Hacker News.
 *
 * HOW IT WORKS:
 * 1. Calculate the Unix timestamp for 24 hours ago.
 * 2. For each search query, make a parallel API call to Algolia.
 * 3. Each query searches for stories created in the last 24 hours.
 * 4. Results are deduplicated by objectID (HN story ID).
 * 5. After all queries complete, sort by points descending and take top 30.
 *
 * ALGOLIA API PARAMETERS:
 * - tags=story — only fetch stories (not comments)
 * - query=... — search term
 * - numericFilters=created_at_i>... — only stories newer than 24h ago
 * - hitsPerPage=30 — fetch up to 30 results per query
 *
 * @returns HnData with stories array and fetchSuccess flag
 */
export async function fetchHnData(): Promise<HnData> {
  const since = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000);
  const seen = new Map<string, HnStory>();

  try {
    await Promise.all(
      QUERIES.map(async (q) => {
        try {
          const url =
            `https://hn.algolia.com/api/v1/search_by_date` +
            `?tags=story` +
            `&query=${encodeURIComponent(q)}` +
            `&numericFilters=created_at_i>${since}` +
            `&hitsPerPage=30`;
          const resp = await fetch(url, {
            headers: { "User-Agent": "agents-radar/1.0" },
          });
          if (!resp.ok) {
            console.error(`  [hn] "${q}": HTTP ${resp.status}`);
            return;
          }
          const data = (await resp.json()) as AlgoliaResponse;
          for (const hit of data.hits ?? []) {
            if (!seen.has(hit.objectID)) {
              const hnUrl = `https://news.ycombinator.com/item?id=${hit.objectID}`;
              seen.set(hit.objectID, {
                id: hit.objectID,
                title: hit.title,
                url: hit.url ?? hnUrl,
                hnUrl,
                points: hit.points ?? 0,
                comments: hit.num_comments ?? 0,
                author: hit.author,
                createdAt: hit.created_at,
              });
            }
          }
        } catch (err) {
          console.error(`  [hn] "${q}": ${err}`);
        }
      }),
    );

    const stories = [...seen.values()].sort((a, b) => b.points - a.points).slice(0, HN_TOP_STORIES);

    console.log(`  [hn] ${stories.length} stories (from ${seen.size} unique)`);
    return { stories, fetchSuccess: stories.length > 0 };
  } catch (err) {
    console.error(`  [hn] fetch failed: ${err}`);
    return { stories: [], fetchSuccess: false };
  }
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
// Fetches top AI stories from Hacker News via the Algolia Search API.
// Key patterns:
// 1. Parallel queries with Promise.all (6 queries simultaneously)
// 2. Deduplication with a Map (keyed by story ID)
// 3. Sort by points, truncate to top 30
//
// QUESTIONS:
// Q1: Why use a Map instead of a Set for deduplication?
//     (Answer: Map stores the full HnStory object — we need to access the data later.
//      Set only stores keys, so we'd need a separate data structure.)
// Q2: What does `encodeURIComponent(q)` do?
//     (Answer: Escapes special characters in the query string for use in a URL.
//      E.g. "machine learning" → "machine%20learning")
// ─────────────────────────────────────────────────────────────────────────────
