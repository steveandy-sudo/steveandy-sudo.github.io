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
for (const file of files) {
  const path = relative(root, file).split(sep).join('/');
  if (/(^|\/)cv\//i.test(path) || /(?:Junghun_Hwang_CV|황정헌.*CV).*\.pdf$/i.test(path)) errors.push(`CV must stay private: ${path}`);
}
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
const projectRoutes = ['/projects/kookmin-ai-edge/', '/projects/ai-sw-mobility/', '/projects/camera-v2i-e2e/', '/projects/uav-waypoint/', '/projects/vmodel-neuro-symbolic/'];
for (const route of ['/', ...projectRoutes, '/ko/', ...projectRoutes.map(route => `/ko${route}`)]) {
  if (!routes.includes(route)) errors.push(`Missing route ${route}`);
}
let checkedLinks = 0;
for (const file of htmlFiles) {
  const document = await doc(file);
  const route = routeOf(file);
  const pageUrl = new URL(route, origin);
  const ko = route.startsWith('/ko/');
  const language = ko ? 'ko' : 'en';
  const englishRoute = route.replace(/^\/ko\//, '/');
  const prefix = ko ? '/ko' : '';
  if (document.documentElement.lang !== language) errors.push(`${route}: incorrect document language`);
  if (route !== '/404.html') {
    for (const [lang, target] of [['en', englishRoute], ['ko', `/ko${englishRoute}`], ['x-default', englishRoute]]) {
      if (document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)?.getAttribute('href') !== origin + target) errors.push(`${route}: incorrect ${lang} alternate`);
      if (lang !== 'x-default' && document.querySelector(`.language-switch a[data-language="${lang}"]`)?.getAttribute('href') !== target) errors.push(`${route}: incorrect ${lang} switch target`);
    }
    if (document.querySelector('.language-switch a[aria-current="page"]')?.getAttribute('data-language') !== language) errors.push(`${route}: incorrect active language`);
    const alternate = await doc(await targetOf(new URL(ko ? englishRoute : `/ko${route}`, origin)));
    const mapping = JSON.parse(document.querySelector('.language-switch')?.getAttribute('data-anchor-map') || '{}');
    for (const [source, target] of Object.entries(mapping)) {
      if (!document.getElementById(source) || !alternate.getElementById(target)) errors.push(`${route}: invalid translated section ${source} → ${target}`);
    }
    for (const link of document.querySelectorAll('.global-nav a')) if (!link.getAttribute('href').startsWith(`${prefix}/#`)) errors.push(`${route}: navigation leaves selected language`);
  }
  if (document.querySelectorAll('h1').length !== 1) errors.push(`${route}: expected one h1`);
  if (!document.querySelector('main#main')) errors.push(`${route}: missing skip target`);
  for (const field of ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:url"]']) {
    if (!document.querySelector(field)?.getAttribute('content')?.trim()) errors.push(`${route}: missing ${field}`);
  }
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (canonical !== origin + route) errors.push(`${route}: incorrect user-site canonical`);
  const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
  if (new Set(ids).size !== ids.length) errors.push(`${route}: duplicate IDs`);
  if (document.querySelector('[data-media-slot]')) errors.push(`${route}: development media request exposed in production`);
  if (route.includes('/projects/')) {
    if (!document.querySelector('#my-contribution') || !document.querySelector('.contribution-section li')) errors.push(`${route}: missing personal contribution`);
    if (!document.querySelector('.toc-desktop') || !document.querySelector('.toc-mobile')) errors.push(`${route}: missing responsive local navigation`);
    if (document.querySelectorAll('a[href^="https://github.com/"]').length > 1) errors.push(`${route}: duplicate GitHub links`);
  }
  if (document.querySelector('a[download][href$=".gif"]')) errors.push(`${route}: GIF download button must not be displayed`);
  if (englishRoute === '/') {
    const linkedProjects = [];
    for (const project of document.querySelectorAll('.project-entry')) {
      const titleTarget = project.querySelector('h3 a')?.getAttribute('href');
      const previewTarget = project.querySelector('a.project-preview')?.getAttribute('href');
      if (!projectRoutes.map(target => prefix + target).includes(titleTarget) || previewTarget !== titleTarget) errors.push(`${route}: project title and image must link to its detail page in the selected language`);
      if (titleTarget) linkedProjects.push(titleTarget);
      if (project.querySelectorAll('a[href^="https://github.com/"]').length > 1) errors.push('Home: projects must have at most one GitHub link');
    }
    if (new Set(linkedProjects).size !== projectRoutes.length) errors.push('Home: some projects are not accessible');
    if (linkedProjects[0] !== `${prefix}/projects/ai-sw-mobility/` || linkedProjects[1] !== `${prefix}/projects/kookmin-ai-edge/`) errors.push('Home: expected AI·SW and Kookmin as the first two projects');
    if (document.querySelectorAll('.project-entry a[href^="https://github.com/"]').length !== 4) errors.push('Home: expected four public project repositories');
  }
  if (englishRoute === '/' || englishRoute === '/projects/ai-sw-mobility/') {
    if (document.querySelectorAll('a[href="https://github.com/steveandy-sudo/ai-sw-mobility-portfolio"]').length !== 1) errors.push(`${route}: expected one public AI·SW repository link`);
    if (document.querySelector('[data-repository-visibility="private"]')) errors.push(`${route}: obsolete private repository notice`);
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
  if (englishRoute === '/projects/kookmin-ai-edge/') {
    if (!document.querySelector('a[href="https://github.com/steveandy-sudo/kookmin-autonomous-portfolio"]')) errors.push(`${route}: missing portfolio repository link`);
    if (document.querySelector('a[href*="kookmin_autonomous_competition_teamKAI"]')) errors.push(`${route}: obsolete team repository link`);
  }
}
for (const file of ['sitemap-index.xml','sitemap-0.xml','robots.txt','favicon.svg']) if (!files.includes(resolve(root,file))) errors.push(`Missing ${file}`);
const liveIndex = process.argv.indexOf('--live');
if (liveIndex >= 0) {
  const base = process.argv[liveIndex + 1] ?? origin;
  for (const route of [...routes.filter(r => r !== '/404.html'), '/sitemap-index.xml']) {
    const response = await fetch(new URL(route, base));
    if (!response.ok) errors.push(`Live ${route}: HTTP ${response.status}`);
    else if (route.endsWith('/')) {
      const live = parseHTML(await response.text()).document;
      const local = await doc(await targetOf(new URL(route, origin)));
      if (live.title !== local.title) errors.push(`Live ${route}: title differs from built page`);
      if (live.documentElement.lang !== local.documentElement.lang) errors.push(`Live ${route}: language differs from built page`);
      const content = document => {
        const main = document.querySelector('main')?.cloneNode(true);
        // Bundlers may place inline scripts at different component instances.
        for (const node of main?.querySelectorAll('script,style,template') ?? []) node.remove();
        return main?.textContent.replace(/\s+/g, ' ').trim();
      };
      if (content(live) !== content(local)) errors.push(`Live ${route}: content differs from built page`);
      for (const locale of ['en', 'ko']) if (live.querySelector(`.language-switch a[data-language="${locale}"]`)?.getAttribute('href') !== local.querySelector(`.language-switch a[data-language="${locale}"]`)?.getAttribute('href')) errors.push(`Live ${route}: ${locale} navigation differs`);
    }
  }
  for (const route of ['/cv/Junghun_Hwang_CV_V2_EN.pdf', '/cv/Junghun_Hwang_CV_V2_KO.pdf']) {
    const response = await fetch(new URL(route, base));
    if (response.status !== 404) errors.push(`Private CV URL ${route}: expected HTTP 404, received ${response.status}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`PASS: ${htmlFiles.length} HTML pages, ${checkedLinks} local links/assets/anchors, SEO, contribution sections, public-link policy and no exposed internal media requests.`);
console.log(routes.join('\n'));
