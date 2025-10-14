// scripts/gen-sitemap.mjs
import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFileSync } from 'node:fs';
const base = 'https://rafaelflores.net';
const links = [
  { url: '/' },
  { url: '/lite/' },
  // add project routes you pre-render, e.g.:
  // { url: '/projects/tokens' }
];
const stream = new SitemapStream({ hostname: base });
links.forEach(l => stream.write(l)); stream.end();
const xml = await streamToPromise(stream);
writeFileSync('public/sitemap.xml', xml.toString());