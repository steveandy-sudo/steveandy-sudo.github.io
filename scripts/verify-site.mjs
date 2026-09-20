import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { parseHTML } from 'linkedom';
const root = resolve('dist');
const origin = 'https://steveandy-sudo.github.io';
const errors = [];
const documents = new Map();
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path)); else files.push(path);
  }
  return files;
}
const files = await walk(root);
function routeOf(file) {
  const path = '/' + relative(root, file).split(sep).join('/');
  return path.endsWith('/index.html') ? path.slice(0, -10) : path;
}
async function doc(file) {
  if (!documents.has(file)) documents.set(file, parseHTML(await readFile(file, 'utf8')).document);
  return documents.get(file);
}
async function targetOf(url) {
  let path = resolve(root, '.' + decodeURIComponent(url.pathname));
  if (!path.startsWith(root + sep) && path !== root) throw new Error('Path escapes build output');
  if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
  return path;
}
const htmlFiles = files.filter(file => file.endsWith('.html'));
const routes = htmlFiles.map(routeOf);
for (const route of ['/', '/ko/', '/projects/kookmin-ai-edge/', '/projects/ai-sw-mobility/', '/projects/camera-v2i-e2e/', '/projects/uav-waypoint/', '/projects/vmodel-neuro-symbolic/']) {
  if (!routes.includes(route)) errors.push(`Missing route ${route}`);
}
let checkedLinks = 0;
for (const file of htmlFiles) {
  const document = await doc(file);
  const route = routeOf(file);
  const pageUrl = new URL(route, origin);
  if (document.querySelectorAll('h1').length !== 1) errors.push(`${route}: expected one h1`);
  if (!document.querySelector('main#main')) errors.push(`${route}: missing skip target`);
  for (const field of ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:url"]']) {
    if (!document.querySelector(field)?.getAttribute('content')?.trim()) errors.push(`${route}: missing ${field}`);
  }
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (!canonical?.startsWith(origin + '/') || new URL(canonical).pathname.startsWith('/steveandy-sudo.github.io/')) errors.push(`${route}: incorrect user-site canonical`);
  const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
  if (new Set(ids).size !== ids.length) errors.push(`${route}: duplicate IDs`);
  if (document.querySelector('[data-media-slot]')) errors.push(`${route}: development media request exposed in production`);
  if (route.includes('/projects/')) {
    if (!document.querySelector('#my-contribution') || !document.querySelector('.contribution-section li')) errors.push(`${route}: missing personal contribution`);
    if (!document.querySelector('.toc-desktop') || !document.querySelector('.toc-mobile')) errors.push(`${route}: missing responsive local navigation`);
  }
  for (const image of document.querySelectorAll('img')) if (!image.getAttribute('alt')?.trim()) errors.push(`${route}: image without alt`);
  const refs = [];
  for (const el of document.querySelectorAll('[href],[src],[poster],[srcset]')) {
    for (const attr of ['href','src','poster']) if (el.hasAttribute(attr)) refs.push(el.getAttribute(attr));
    if (el.hasAttribute('srcset')) refs.push(...el.getAttribute('srcset').split(',').map(s => s.trim().split(/\s+/)[0]));
  }
  for (const ref of refs) {
    if (!ref || ref === '#' || /^javascript:/i.test(ref)) { errors.push(`${route}: placeholder link ${ref}`); continue; }
    const url = new URL(ref, pageUrl);
    if (url.origin !== origin) continue;
    try {
      const target = await targetOf(url);
      if (url.hash && target.endsWith('.html') && !(await doc(target)).getElementById(decodeURIComponent(url.hash.slice(1)))) errors.push(`${route}: missing anchor ${ref}`);
      checkedLinks++;
    } catch { errors.push(`${route}: missing local target ${ref}`); }
  }
  if (route === '/projects/kookmin-ai-edge/') {
    if (!document.querySelector('a[href="https://github.com/steveandy-sudo/kookmin-autonomous-portfolio"]')) errors.push(`${route}: missing portfolio repository link`);
    if (document.querySelector('a[href*="kookmin_autonomous_competition_teamKAI"]')) errors.push(`${route}: obsolete team repository link`);
  }
}
for (const file of ['sitemap-index.xml','sitemap-0.xml','robots.txt','favicon.svg']) if (!files.includes(resolve(root,file))) errors.push(`Missing ${file}`);
const liveIndex = process.argv.indexOf('--live');
if (liveIndex >= 0) {
  const base = process.argv[liveIndex + 1] ?? origin;
  for (const route of [...routes.filter(r => r !== '/404.html'), '/cv/Junghun_Hwang_CV_V2_EN.pdf','/cv/Junghun_Hwang_CV_V2_KO.pdf','/sitemap-index.xml']) {
    const response = await fetch(new URL(route, base));
    if (!response.ok) errors.push(`Live ${route}: HTTP ${response.status}`);
    else if (route.endsWith('/')) {
      const live = parseHTML(await response.text()).document;
      const local = await doc(await targetOf(new URL(route, origin)));
      if (live.title !== local.title) errors.push(`Live ${route}: title differs from built page`);
    }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`PASS: ${htmlFiles.length} HTML pages, ${checkedLinks} local links/assets/anchors, SEO, contribution sections, public-link policy and no exposed internal media requests.`);
console.log(routes.join('\n'));
