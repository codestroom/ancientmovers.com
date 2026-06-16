// Generates backend/seed.sql from the existing hardcoded BLOGS array.
// Run: node scripts/generate-seed.mjs
import { BLOGS } from '../src/data/siteData.js';
import { writeFileSync } from 'node:fs';

// Escape for a MySQL/MariaDB single-quoted string literal. Backslash MUST be
// doubled first (MySQL treats \ as an escape char), otherwise JSON escape
// sequences like \" get mangled and fail the JSON validity check (error 4025).
const esc = (v) => (v === null || v === undefined ? null : String(v).replace(/\\/g, '\\\\').replace(/'/g, "''"));
const sql = (v) => (v === null || v === undefined ? 'NULL' : `'${esc(v)}'`);

const rows = BLOGS.map((b, i) => {
  const content = JSON.stringify(b.content ?? []);
  const vals = [
    sql(b.slug),
    sql(b.title),
    sql(b.excerpt),
    sql(b.category),
    sql(b.date),
    sql(b.readTime),
    sql(b.image),
    sql(b.author?.name ?? 'Ancient Movers Team'),
    sql(b.author?.initials ?? 'AM'),
    sql(content),
    i, // sort_order — preserves current order (top = first)
  ];
  return `  (${vals.join(', ')})`;
});

const out = `-- Seed data generated from src/data/siteData.js (${BLOGS.length} posts)
-- Run AFTER schema.sql, in the same database.

INSERT INTO blogs
  (slug, title, excerpt, category, display_date, read_time, image, author_name, author_initials, content, sort_order)
VALUES
${rows.join(',\n')};
`;

writeFileSync(new URL('../backend/seed.sql', import.meta.url), out);
console.log(`Wrote backend/seed.sql with ${BLOGS.length} posts.`);
