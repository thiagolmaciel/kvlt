import Parser from "rss-parser";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "src", "data", "ai-news.json");
const MAX_ITEMS = 12;

const HIGH_WEIGHT_KEYWORDS = [
  "openai", "anthropic", "google", "microsoft", "meta", "amazon", "nvidia", "apple",
  "gpt", "claude", "gemini", "llama",
  "funding", "raises", "valuation", "ipo", "acquisition", "acquires", "billion",
  "regulation", "regulator", "law", "lawsuit", "ban",
  "breakthrough", "launch", "launches", "release", "releases", "unveils",
];
const MEDIUM_WEIGHT_KEYWORDS = [
  "startup", "model", "agent", "chip", "data center", "partnership", "investment", "research",
];

function scoreItem(item) {
  const text = `${item.title} ${item.summary}`.toLowerCase();
  let score = 0;
  for (const kw of HIGH_WEIGHT_KEYWORDS) if (text.includes(kw)) score += 2;
  for (const kw of MEDIUM_WEIGHT_KEYWORDS) if (text.includes(kw)) score += 1;
  return score;
}

function assignImportance(items) {
  const sorted = [...items].sort((a, b) => b._score - a._score);
  const highCut = Math.ceil(sorted.length / 3);
  const midCut = Math.ceil((sorted.length * 2) / 3);
  const rank = new Map(sorted.map((item, i) => [item, i]));
  return items.map((item) => {
    const i = rank.get(item);
    const importance = i < highCut ? "alta" : i < midCut ? "media" : "baixa";
    const rest = { ...item };
    delete rest._score;
    return { ...rest, importance };
  });
}

const FEEDS = [
  { source: "TechCrunch", url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
  { source: "The Verge", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml" },
  { source: "VentureBeat", url: "https://venturebeat.com/category/ai/feed/" },
  { source: "MIT Technology Review", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed" },
  { source: "Ars Technica", url: "https://arstechnica.com/tag/ai/feed/" },
];

function startOfDaySaoPaulo(date) {
  // America/Sao_Paulo is fixed UTC-3 (no DST since 2019).
  const utc = new Date(date.getTime());
  utc.setUTCHours(utc.getUTCHours() - 3);
  utc.setUTCHours(0, 0, 0, 0);
  utc.setUTCHours(utc.getUTCHours() + 3);
  return utc;
}

async function main() {
  const parser = new Parser({ timeout: 15000 });
  const now = new Date();
  const todayStart = startOfDaySaoPaulo(now);
  const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);

  const results = await Promise.allSettled(
    FEEDS.map(async (feed) => {
      const parsed = await parser.parseURL(feed.url);
      return (parsed.items ?? []).map((item) => ({
        title: item.title?.trim() ?? "",
        url: item.link ?? "",
        source: feed.source,
        publishedAt: item.isoDate ?? item.pubDate ?? "",
        summary: (item.contentSnippet ?? item.summary ?? "").trim().slice(0, 220),
      }));
    })
  );

  const filtered = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .filter((item) => item.title && item.url && item.publishedAt)
    .filter((item) => {
      const published = new Date(item.publishedAt);
      return published >= yesterdayStart && published < todayStart;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ITEMS)
    .map((item) => ({ ...item, _score: scoreItem(item) }));

  const allItems = assignImportance(filtered);

  const failed = results.filter((r) => r.status === "rejected");
  for (const f of failed) {
    console.error("Feed fetch failed:", f.reason);
  }

  const output = {
    generatedAt: now.toISOString(),
    items: allItems,
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${allItems.length} AI news items to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
