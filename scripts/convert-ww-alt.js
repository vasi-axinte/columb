const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const ALT_PATH = path.join(SRC, 'assets', 'data', 'ww-lookup-alt.json');
const OUT_DIR = path.join(SRC, 'assets', 'content', 'ww-lookup');

const MONTHS_RO = {
  'ianuarie': '01',
  'februarie': '02',
  'martie': '03',
  'aprilie': '04',
  'mai': '05',
  'iunie': '06',
  'iulie': '07',
  'august': '08',
  'septembrie': '09',
  'octombrie': '10',
  'noiembrie': '11',
  'decembrie': '12',
};

function toIso(dateStr) {
  // e.g. "01 Ianuarie 2025" -> "2025-01-01"
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length !== 3) throw new Error(`Unexpected date format: ${dateStr}`);
  const [dd, monthRo, yyyy] = parts;
  const mm = MONTHS_RO[monthRo.toLowerCase()];
  if (!mm) throw new Error(`Unknown month: ${monthRo}`);
  const d2 = dd.padStart(2, '0');
  return `${yyyy}-${mm}-${d2}`;
}

function run() {
  const raw = fs.readFileSync(ALT_PATH, 'utf8');
  const data = JSON.parse(raw);
  const all = [...(data.modulVechi || []), ...(data.modulNou || [])];

  // Map to unified objects
  const mapped = all.map((x) => {
    const iso = toIso(x.date);
    const year = Number(iso.slice(0, 4));
    return {
      year,
      date: iso,
      lastPlate: x.code.startsWith('WW-') ? x.code : `WW-${x.code}`,
    };
  });

  // Group by year and sort by date
  const byYear = new Map();
  for (const item of mapped) {
    if (!byYear.has(item.year)) byYear.set(item.year, []);
    byYear.get(item.year).push({ date: item.date, lastPlate: item.lastPlate });
  }
  for (const [year, arr] of byYear.entries()) {
    arr.sort((a, b) => a.date.localeCompare(b.date));
    const out = { year, wwDaily: arr };
    const outPath = path.join(OUT_DIR, `${year}.json`);
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${outPath} (${arr.length} days)`);
  }
}

run();
