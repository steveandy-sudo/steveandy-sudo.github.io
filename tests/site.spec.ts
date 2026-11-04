import { test, expect, type Page } from '@playwright/test';

const languages = ['en', 'ko'] as const;
type Language = typeof languages[number];
const projectSlugs = ['kookmin-ai-edge', 'ai-sw-mobility', 'camera-v2i-e2e', 'uav-waypoint', 'vmodel-neuro-symbolic'];
const englishRoutes = ['/', ...projectSlugs.map(slug => `/projects/${slug}/`)];
const localizedRoute = (lang: Language, route: string) => lang === 'ko' ? `/ko${route}` : route;
const routes = languages.flatMap(lang => englishRoutes.map(route => ({ lang, route, path: localizedRoute(lang, route) })));
const repositories = [
  ['kookmin-ai-edge', 'https://github.com/steveandy-sudo/kookmin-autonomous-portfolio'],
  ['ai-sw-mobility', 'https://github.com/steveandy-sudo/ai-sw-mobility-portfolio'],
  ['uav-waypoint', 'https://github.com/steveandy-sudo/uav-waypoint-portfolio'],
  ['vmodel-neuro-symbolic', 'https://github.com/steveandy-sudo/vmodel-driving-portfolio'],
] as const;

async function expectLocaleNavigation(page: Page, lang: Language, englishRoute: string) {
  const home = localizedRoute(lang, '/');
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await expect(page.locator('.wordmark')).toHaveAttribute('href', home);
  await expect(page.locator('.global-nav a')).toHaveText(lang === 'ko'
    ? ['연구 관심', '프로젝트', '수상', '사용 기술']
    : ['Research', 'Projects', 'Awards', 'Skills']);
  for (const section of ['research', 'projects', 'awards', 'skills']) {
    await expect(page.locator(`.global-nav a[href="${home}#${section}"]`)).toHaveCount(1);
  }
  const switcher = page.locator('nav.language-switch');
  await expect(switcher).toHaveAccessibleName(lang === 'ko' ? '언어 선택' : 'Language selection');
  await expect(switcher.locator('a[data-language]')).toHaveCount(2);
  await expect(switcher.locator('a[aria-current="page"]')).toHaveCount(1);
  for (const locale of languages) {
    const target = localizedRoute(locale, englishRoute);
    const link = switcher.locator(`a[data-language="${locale}"]`);
    await expect(link).toBeVisible();
    await expect(link).toHaveText(locale === 'ko' ? '한국어' : 'English');
    await expect(link).toHaveAttribute('lang', locale);
    await expect(link).toHaveAttribute('hreflang', locale);
    await expect(link).toHaveAttribute('data-base-path', target);
    expect(await link.evaluate(anchor => new URL((anchor as HTMLAnchorElement).href).pathname)).toBe(target);
    if (locale === lang) await expect(link).toHaveAttribute('aria-current', 'page');
    else await expect(link).not.toHaveAttribute('aria-current');
    const alternate = page.locator(`head link[rel="alternate"][hreflang="${locale}"]`);
    await expect(alternate).toHaveCount(1);
    expect(await alternate.evaluate(linkElement => new URL((linkElement as HTMLLinkElement).href).pathname)).toBe(target);
  }
  await expect(page.locator('#cv, .github-section')).toHaveCount(0);
  await expect(page.locator('.global-nav a[href$="#cv"], a[href="https://github.com/steveandy-sudo"]')).toHaveCount(0);
  await expect(page.locator('a[download][href$=".gif"], .animation-controls a')).toHaveCount(0);
}

async function expectSection(page: Page, pathname: string, id: string) {
  await expect(page).toHaveURL(url => url.pathname === pathname && decodeURIComponent(url.hash.slice(1)) === id);
  await expect(page.locator(`[id="${id}"]`)).toBeInViewport();
}

for (const width of [1440, 768, 390, 320]) {
  test(`English and Korean routes remain usable at ${width}px`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 900 });
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    for (const { lang, route, path } of routes) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await expectLocaleNavigation(page, lang, route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBeTruthy();
      if (route.includes('/projects/')) {
        await expect(page.locator('.back-link')).toHaveAttribute('href', `${localizedRoute(lang, '/')}#projects`);
        const mobile = width <= 760;
        if (mobile) await page.locator('.toc-mobile summary').click();
        const nav = page.locator(mobile ? '.toc-mobile' : '.toc-desktop');
        await nav.locator('a[href="#my-contribution"]').click();
        await expectSection(page, path, 'my-contribution');
        if (mobile) await expect(page.locator('.toc-mobile')).not.toHaveAttribute('open', '');
        else await expect(nav.locator('[data-section="my-contribution"]')).toHaveAttribute('aria-current', 'location');
      }
    }
    expect(pageErrors).toEqual([]);
  });
}

for (const lang of languages) {
  test(`${lang}: keyboard navigation, localized project cards and repository policy`, async ({ page }) => {
    test.setTimeout(60_000);
    const home = localizedRoute(lang, '/');
    await page.goto(home);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(url => url.pathname === home && url.hash === '#main');
    await expectLocaleNavigation(page, lang, '/');
    const cards = page.locator('.project-entry');
    await expect(cards).toHaveCount(5);
    await expect(page.locator('.project-list a')).toHaveCount(14);
    await expect(page.locator(`.project-list a[href^="${localizedRoute(lang, '/projects/')}"]`)).toHaveCount(10);
    await expect(page.getByRole('link', { name: /Read case study/i })).toHaveCount(0);
    for (const slug of projectSlugs) {
      const href = localizedRoute(lang, `/projects/${slug}/`);
      const card = cards.filter({ has: page.locator(`a[href="${href}"]`) });
      await expect(card).toHaveCount(1);
      await expect(card.locator(`a[href="${href}"]`)).toHaveCount(2);
      await expect(card.locator('h3 a')).toHaveAttribute('href', href);
      await expect(card.locator('a:has(img)')).toHaveAttribute('href', href);
    }
    for (const [, repository] of repositories) {
      const card = cards.filter({ has: page.locator(`a[href="${repository}"]`) });
      await expect(card).toHaveCount(1);
      await expect(card.getByRole('link')).toHaveCount(3);
      await expect(card.locator('a[href^="https://github.com/"]')).toHaveCount(1);
      await expect(card.locator('a[href^="https://github.com/"]')).toHaveAccessibleName(/GitHub/);
    }
    await expect(cards.locator('[data-repository-visibility="private"]')).toHaveCount(0);
    const capstonePath = localizedRoute(lang, '/projects/camera-v2i-e2e/');
    const capstoneCard = cards.filter({ has: page.locator(`h3 a[href="${capstonePath}"]`) });
    await expect(capstoneCard).toHaveCount(1);
    await expect(capstoneCard.getByRole('link')).toHaveCount(2);
    await expect(capstoneCard.locator('a[href^="https://github.com/"]')).toHaveCount(0);
    const repositoryLabel = lang === 'ko' ? 'GitHub 저장소' : 'GitHub repository';
    for (const [slug, repository] of repositories) {
      await page.goto(localizedRoute(lang, `/projects/${slug}/`));
      await expect(page.locator('.case-header').getByRole('link', { name: repositoryLabel, exact: true })).toHaveAttribute('href', repository);
      await expect(page.locator('a[href^="https://github.com/"]')).toHaveCount(1);
      await expect(page.locator('[data-repository-visibility="private"]')).toHaveCount(0);
    }
    await page.goto(capstonePath);
    await expect(page.locator('.case-header a[href^="https://github.com/"]')).toHaveCount(0);
    await expect(page.locator('[data-repository-visibility="private"]')).toHaveCount(0);
    for (const route of ['/', '/projects/ai-sw-mobility/']) {
      await page.goto(localizedRoute(lang, route));
      const repository = page.locator('a[href="https://github.com/steveandy-sudo/ai-sw-mobility-portfolio"]');
      await expect(repository).toHaveCount(1);
      await expect(repository).toBeVisible();
    }
    await page.goto(localizedRoute(lang, '/projects/kookmin-ai-edge/'));
    await expect(page.locator('a[href*="kookmin_autonomous_competition_teamKAI"]')).toHaveCount(0);
    await expect(page.locator('[data-media-slot]')).toHaveCount(0);
  });
}

test('home language switching preserves common section anchors', async ({ page }) => {
  await page.goto('/#projects');
  await page.locator('.language-switch a[data-language="ko"]').click();
  await expectSection(page, '/ko/', 'projects');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
  await expect(page.locator('.language-switch a[data-language="ko"]')).toHaveAttribute('aria-current', 'page');
  await page.locator('.language-switch a[data-language="en"]').click();
  await expectSection(page, '/', 'projects');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

for (const slug of projectSlugs) {
  test(`${slug}: every H2 anchor survives English to Korean to English switching`, async ({ page }) => {
    test.setTimeout(120_000);
    // Keep repeated navigations independent of an unfinished smooth scroll.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const englishPath = `/projects/${slug}/`;
    const koreanPath = localizedRoute('ko', englishPath);
    const headingSelector = '.case-content h2[id]:not(#overview):not(#my-contribution)';
    await page.goto(englishPath);
    const englishHeadings = await page.locator(headingSelector).evaluateAll(headings => headings.map(heading => heading.id));
    const englishMap = JSON.parse(await page.locator('.language-switch').getAttribute('data-anchor-map') ?? '{}') as Record<string, string>;
    await page.goto(koreanPath);
    const koreanHeadings = await page.locator(headingSelector).evaluateAll(headings => headings.map(heading => heading.id));
    const koreanMap = JSON.parse(await page.locator('.language-switch').getAttribute('data-anchor-map') ?? '{}') as Record<string, string>;
    expect(englishHeadings.length).toBeGreaterThan(0);
    expect(koreanHeadings).toHaveLength(englishHeadings.length);
    for (const [index, englishId] of englishHeadings.entries()) {
      const koreanId = koreanHeadings[index];
      expect(englishMap[englishId]).toBe(koreanId);
      expect(koreanMap[koreanId]).toBe(englishId);
      await page.goto(`${englishPath}#${encodeURIComponent(englishId)}`);
      await expectSection(page, englishPath, englishId);
      const toKorean = page.locator('.language-switch a[data-language="ko"]');
      await expect(toKorean).toHaveAttribute('data-base-path', koreanPath);
      await toKorean.click();
      await expectSection(page, koreanPath, koreanId);
      await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
      await expect(page.locator('.language-switch a[data-language="ko"]')).toHaveAttribute('aria-current', 'page');
      const toEnglish = page.locator('.language-switch a[data-language="en"]');
      await expect(toEnglish).toHaveAttribute('data-base-path', englishPath);
      await toEnglish.click();
      await expectSection(page, englishPath, englishId);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('.language-switch a[data-language="en"]')).toHaveAttribute('aria-current', 'page');
    }
  });
}

test('Korean GIF controls toggle playback with translated accessible names', async ({ page }) => {
  await page.goto('/ko/projects/uav-waypoint/');
  const figure = page.locator('.animated-figure');
  await expect(figure).toHaveCount(1);
  const image = figure.locator('img');
  const button = figure.getByRole('button');
  const still = await figure.getAttribute('data-still');
  const animation = await figure.getAttribute('data-animation');
  const alt = await image.getAttribute('alt');
  expect(still).toBeTruthy();
  expect(animation).toBeTruthy();
  expect(alt).toMatch(/[가-힣]/);
  await expect(button).toHaveText('GIF 재생');
  await expect(button).toHaveAccessibleName(`GIF 재생: ${alt}`);
  await expect(button).toHaveAttribute('aria-pressed', 'false');
  await expect(image).toHaveAttribute('src', still!);
  await button.click();
  await expect(button).toHaveText('정지 이미지 보기');
  await expect(button).toHaveAccessibleName(`정지 이미지 보기: ${alt}`);
  await expect(button).toHaveAttribute('aria-pressed', 'true');
  await expect(image).toHaveAttribute('src', animation!);
  await button.click();
  await expect(button).toHaveText('GIF 재생');
  await expect(button).toHaveAttribute('aria-pressed', 'false');
  await expect(image).toHaveAttribute('src', still!);
  await expect(figure.locator('a[download], .animation-controls a')).toHaveCount(0);
});

test('text enlargement and representative English and Korean screenshots', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const captures = [
    ['home-en', '/'],
    ['case-en', '/projects/kookmin-ai-edge/'],
    ['home-ko', '/ko/'],
    ['ai-sw-mobility-ko', '/ko/projects/ai-sw-mobility/'],
    ['case-ko', '/ko/projects/kookmin-ai-edge/'],
  ] as const;
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [name, route] of captures) {
      await page.goto(route);
      await expect(page.locator('h1')).toBeVisible();
      await page.screenshot({ path: testInfo.outputPath(`${name}-${width}.png`), fullPage: true });
    }
  }
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
});
