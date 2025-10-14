// scripts/gen-sitemap.mjs
import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFileSync } from 'node:fs';

try {
  const base = 'https://rafaelflores.net';
  const links = [
    { url: '/' },
    { url: '/lite/' },
    { url: '/case-studies/ai-swing-coach-mobile-trading' },
    { url: '/case-studies/cutting-late-stage-defects-with-design-system-guardrails' }
  ];
  const stream = new SitemapStream({ hostname: base });
  links.forEach(l => stream.write(l)); stream.end();
  const xml = await streamToPromise(stream);
  writeFileSync('public/sitemap.xml', xml.toString());
  console.log('sitemap.xml generated');
} catch (err) {
  console.warn('Skipping sitemap generation:', err?.message || err);
}
