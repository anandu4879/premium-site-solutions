import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://www.bjrmaintenance.com";
const publicDir = path.resolve(process.cwd(), "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const siteConfigPath = path.resolve(process.cwd(), "src/config/siteConfig.ts");

const staticPages = [
  { path: "/", priority: "1.00", changefreq: "daily" },
  { path: "/about", priority: "0.80", changefreq: "monthly" },
  { path: "/contact", priority: "0.80", changefreq: "monthly" },
  { path: "/gallery", priority: "0.70", changefreq: "monthly" },
  { path: "/careers", priority: "0.60", changefreq: "monthly" },
  { path: "/services", priority: "0.90", changefreq: "weekly" },
];

const today = new Date().toISOString().split("T")[0];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

async function extractServiceSlugs() {
  const content = await fs.readFile(siteConfigPath, "utf8");
  const uncommented = stripComments(content);
  const matches = [...uncommented.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/gi)].map((match) => match[1]);
  const unique = [...new Set(matches)];

  if (!unique.length) {
    throw new Error("No service slugs found in src/config/siteConfig.ts. Please check the file format.");
  }

  return unique;
}

async function buildSitemap() {
  const serviceSlugs = await extractServiceSlugs();
  const urls = [
    ...staticPages,
    ...serviceSlugs.map((slug) => ({ path: `/services/${slug}`, priority: "0.80", changefreq: "monthly" })),
  ];

  const urlEntries = urls
    .map(
      (entry) => `  <url>\n    <loc>${escapeXml(baseUrl + entry.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(sitemapPath, xml, "utf8");
  console.log(`Generated sitemap at ${sitemapPath}`);
}

buildSitemap().catch((error) => {
  console.error(error);
  process.exit(1);
});
