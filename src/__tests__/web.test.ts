import { describe, it, expect, vi, afterEach } from "vitest";
import {
  parseSitemapUrls,
  isSitemapIndex,
  extractTitle,
  extractText,
  urlCategory,
  titleFromUrl,
  emptyState,
  fetchWebPageItem,
  fetchSiteContent,
} from "../web.ts";

// ---------------------------------------------------------------------------
// parseSitemapUrls
// ---------------------------------------------------------------------------

describe("parseSitemapUrls", () => {
  it("parses urls with loc and lastmod", () => {
    const xml = `
      <urlset>
        <url>
          <loc>https://example.com/page1</loc>
          <lastmod>2026-03-09</lastmod>
        </url>
        <url>
          <loc>https://example.com/page2</loc>
          <lastmod>2026-03-08</lastmod>
        </url>
      </urlset>`;
    const result = parseSitemapUrls(xml);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ loc: "https://example.com/page1", lastmod: "2026-03-09" });
    expect(result[1]).toEqual({ loc: "https://example.com/page2", lastmod: "2026-03-08" });
  });

  it("handles urls without lastmod", () => {
    const xml = `<urlset><url><loc>https://example.com/page</loc></url></urlset>`;
    const result = parseSitemapUrls(xml);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ loc: "https://example.com/page", lastmod: undefined });
  });

  it("returns empty array for empty XML", () => {
    expect(parseSitemapUrls("")).toEqual([]);
    expect(parseSitemapUrls("<urlset></urlset>")).toEqual([]);
  });

  it("handles whitespace in loc/lastmod", () => {
    const xml = `<urlset><url><loc>  https://example.com/page  </loc><lastmod>  2026-03-09  </lastmod></url></urlset>`;
    const result = parseSitemapUrls(xml);
    expect(result[0]!.loc).toBe("https://example.com/page");
    expect(result[0]!.lastmod).toBe("2026-03-09");
  });
});

// ---------------------------------------------------------------------------
// isSitemapIndex
// ---------------------------------------------------------------------------

describe("isSitemapIndex", () => {
  it("detects sitemapindex tag", () => {
    expect(isSitemapIndex('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')).toBe(true);
    expect(isSitemapIndex("<sitemapindex>")).toBe(true);
  });

  it("returns false for regular sitemap", () => {
    expect(isSitemapIndex('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// extractTitle
// ---------------------------------------------------------------------------

describe("extractTitle", () => {
  it("extracts og:title (property first)", () => {
    const html = `<meta property="og:title" content="My Title">`;
    expect(extractTitle(html)).toBe("My Title");
  });

  it("extracts og:title (content first)", () => {
    const html = `<meta content="My Title" property="og:title">`;
    expect(extractTitle(html)).toBe("My Title");
  });

  it("falls back to <title> tag", () => {
    const html = `<html><head><title>Page Title</title></head></html>`;
    expect(extractTitle(html)).toBe("Page Title");
  });

  it("prefers og:title over <title>", () => {
    const html = `<meta property="og:title" content="OG Title"><title>Fallback Title</title>`;
    expect(extractTitle(html)).toBe("OG Title");
  });

  it("returns empty string when no title found", () => {
    expect(extractTitle("<html><body></body></html>")).toBe("");
  });

  it("trims whitespace", () => {
    const html = `<title>  Spaced Title  </title>`;
    expect(extractTitle(html)).toBe("Spaced Title");
  });
});

// ---------------------------------------------------------------------------
// extractText
// ---------------------------------------------------------------------------

describe("extractText", () => {
  it("extracts text from <main> content", () => {
    const html = `<html><nav>Nav</nav><main><p>Main content</p></main><footer>Foot</footer></html>`;
    expect(extractText(html)).toBe("Main content");
  });

  it("falls back to <article> if no <main>", () => {
    const html = `<html><article><p>Article content</p></article></html>`;
    expect(extractText(html)).toBe("Article content");
  });

  it("strips script and style tags", () => {
    const html = `<main><script>alert('x')</script><style>.a{}</style><p>Clean</p></main>`;
    expect(extractText(html)).toBe("Clean");
  });

  it("decodes HTML entities", () => {
    const html = `<main>&amp; &lt; &gt; &quot; &#39; &nbsp;</main>`;
    const result = extractText(html);
    expect(result).toContain("&");
    expect(result).toContain("<");
    expect(result).toContain(">");
    expect(result).toContain('"');
    expect(result).toContain("'");
  });

  it("collapses whitespace", () => {
    const html = `<main><p>  Multiple   spaces   and\n\nnewlines  </p></main>`;
    expect(extractText(html)).toBe("Multiple spaces and newlines");
  });

  it("truncates to MAX_CONTENT_LENGTH (1500 chars)", () => {
    const html = `<main>${"A".repeat(2000)}</main>`;
    expect(extractText(html)).toHaveLength(1500);
  });
});

// ---------------------------------------------------------------------------
// urlCategory
// ---------------------------------------------------------------------------

describe("urlCategory", () => {
  it("returns first path segment", () => {
    expect(urlCategory("https://anthropic.com/news/some-article")).toBe("news");
    expect(urlCategory("https://openai.com/research/gpt-5")).toBe("research");
  });

  it("returns 'article' for root URLs", () => {
    expect(urlCategory("https://example.com/")).toBe("article");
    expect(urlCategory("https://example.com")).toBe("article");
  });

  it("returns 'article' for invalid URLs", () => {
    expect(urlCategory("not a url")).toBe("article");
  });
});

// ---------------------------------------------------------------------------
// titleFromUrl
// ---------------------------------------------------------------------------

describe("titleFromUrl", () => {
  it("converts slug to title case", () => {
    expect(titleFromUrl("https://example.com/blog/my-great-article")).toBe("My Great Article");
  });

  it("handles single-segment paths", () => {
    expect(titleFromUrl("https://example.com/about")).toBe("About");
  });

  it("returns URL for invalid input", () => {
    expect(titleFromUrl("not-a-url")).toBe("not-a-url");
  });
});

// ---------------------------------------------------------------------------
// emptyState
// ---------------------------------------------------------------------------

describe("emptyState", () => {
  it("returns valid empty state structure", () => {
    const state = emptyState();
    expect(state).toEqual({
      anthropic: { lastChecked: "", seenUrls: {} },
      openai: { lastChecked: "", seenUrls: {} },
    });
  });

  it("returns a new object each time", () => {
    const a = emptyState();
    const b = emptyState();
    expect(a).not.toBe(b);
    a.anthropic.lastChecked = "modified";
    expect(b.anthropic.lastChecked).toBe("");
  });
});

// ---------------------------------------------------------------------------
// fetchWebPageItem — single page fetch + body extraction
// ---------------------------------------------------------------------------

describe("fetchWebPageItem", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("extracts title (og:title wins) and body text from a fetched page", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            "<html><head><title>Fallback</title><meta property='og:title' content='OG Title'></head>" +
              "<body><main><p>Hello body</p></main></body></html>",
            { status: 200 },
          ),
      ),
    );
    const item = await fetchWebPageItem("anthropic", "https://anthropic.com/news/x");
    expect(item.title).toBe("OG Title");
    expect(item.content).toBe("Hello body");
    expect(item.category).toBe("news");
    expect(item.site).toBe("anthropic");
  });

  it("falls back to the URL slug for the title when no title tag exists", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("<main><p>Body only</p></main>", { status: 200 })),
    );
    const item = await fetchWebPageItem("openai", "https://openai.com/research/gpt-5");
    expect(item.title).toBe("Gpt 5");
    expect(item.content).toBe("Body only");
  });

  it("throws when the page cannot be fetched (e.g. WAF 403)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("blocked", { status: 403 })),
    );
    await expect(fetchWebPageItem("openai", "https://openai.com/research/x")).rejects.toThrow();
  });
});

// ---------------------------------------------------------------------------
// fetchSiteContent — graceful fallback when the host blocks body fetching
// ---------------------------------------------------------------------------

describe("fetchSiteContent (graceful fallback)", () => {
  afterEach(() => vi.unstubAllGlobals());

  const sitemap = `<?xml version="1.0"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://openai.com/research/gpt-5</loc><lastmod>2026-08-01</lastmod></url>
      <url><loc>https://openai.com/news/foo-bar</loc><lastmod>2026-07-30</lastmod></url>
    </urlset>`;

  it("falls back to metadata-only items when the host blocks fetching (HTTP 403)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (String(url).includes("sitemap.xml/research/")) {
          return new Response(sitemap, { status: 200, headers: { "content-type": "application/xml" } });
        }
        if (String(url).includes("sitemap.xml")) {
          return new Response("<urlset></urlset>", {
            status: 200,
            headers: { "content-type": "application/xml" },
          });
        }
        return new Response("blocked", { status: 403 });
      }),
    );
    const state = emptyState();
    const result = await fetchSiteContent("openai", state);
    expect(result.newItems).toHaveLength(2);
    // No body text — but the articles are preserved (not dropped)
    expect(result.newItems.every((i) => i.content === "")).toBe(true);
    expect(result.newItems[0]!.title).toBe("Gpt 5");
    expect(result.newItems[1]!.title).toBe("Foo Bar");
    // All discovered URLs are still recorded as seen
    expect(Object.keys(state.openai.seenUrls)).toHaveLength(2);
  });

  it("extracts body content when the host is reachable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (String(url).includes("sitemap.xml/research/")) {
          return new Response(sitemap, { status: 200, headers: { "content-type": "application/xml" } });
        }
        if (String(url).includes("sitemap.xml")) {
          return new Response("<urlset></urlset>", {
            status: 200,
            headers: { "content-type": "application/xml" },
          });
        }
        return new Response(
          "<html><head><meta property='og:title' content='Real Title'></head><body><main><p>Body here</p></main></body></html>",
          { status: 200 },
        );
      }),
    );
    const result = await fetchSiteContent("openai", emptyState());
    expect(result.newItems).toHaveLength(2);
    expect(result.newItems[0]!.content).toBe("Body here");
    expect(result.newItems[0]!.title).toBe("Real Title");
  });
});
