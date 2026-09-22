import { test, expect } from '@playwright/test';
const routes = ['/', '/projects/kookmin-ai-edge/', '/projects/ai-sw-mobility/', '/projects/camera-v2i-e2e/', '/projects/uav-waypoint/', '/projects/vmodel-neuro-symbolic/'];
for (const width of [1440, 768, 390, 320]) {
  test(`all routes remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('a[href^="/ko"], a[href*="steveandy-sudo.github.io/ko"], [hreflang="ko"]')).toHaveCount(0);
      await expect(page.getByRole('link', { name: /^(한국어|EN|English)$/ })).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
      if (route.includes('/projects/')) {
        const mobile = width <= 760;
        if (mobile) await page.locator('.toc-mobile summary').click();
        const nav = page.locator(mobile ? '.toc-mobile' : '.toc-desktop');
        await nav.locator('a[href="#my-contribution"]').click();
        await expect(page).toHaveURL(/#my-contribution$/);
        await expect(page.locator('#my-contribution')).toBeInViewport();
        if (mobile) await expect(page.locator('.toc-mobile')).not.toHaveAttribute('open', '');
        else await expect(nav.locator('[data-section="my-contribution"]')).toHaveAttribute('aria-current','location');
      }
    }
    expect(pageErrors).toEqual([]);
  });
}
test('keyboard, English-only navigation, project repositories and development slot visibility', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('link', { name: /^(한국어|EN|English)$/ })).toHaveCount(0);
  await expect(page.locator('a[href^="/ko"], a[href*="steveandy-sudo.github.io/ko"], [hreflang="ko"]')).toHaveCount(0);
  await expect(page.locator('#cv, .github-section')).toHaveCount(0);
  await expect(page.locator('.global-nav a[href$="#cv"], a[href="https://github.com/steveandy-sudo"]')).toHaveCount(0);
  const cards = page.locator('.project-entry');
  await expect(cards).toHaveCount(5);
  await expect(page.locator('.project-list a')).toHaveCount(3);
  await expect(page.locator('.project-list a[href^="/projects/"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Read case study/i })).toHaveCount(0);
  for (const repository of [
    'https://github.com/steveandy-sudo/kookmin-autonomous-portfolio',
    'https://github.com/steveandy-sudo/uav-waypoint-portfolio',
    'https://github.com/steveandy-sudo/vmodel-driving-portfolio',
  ]) {
    const card = cards.filter({ has: page.locator(`a[href="${repository}"]`) });
    await expect(card).toHaveCount(1);
    await expect(card.getByRole('link')).toHaveCount(1);
    await expect(card.getByRole('link')).toHaveAccessibleName(/GitHub/);
  }
  const privateCard = cards.filter({ has: page.locator('[data-repository-visibility="private"]') });
  await expect(privateCard).toHaveCount(1);
  await expect(privateCard.getByRole('link')).toHaveCount(0);
  await expect(privateCard).toContainText('competition is ongoing');
  const capstoneCard = cards.filter({ has: page.getByRole('heading', { level: 3, name: 'Camera-Based V2I & End-to-End Driving', exact: true }) });
  await expect(capstoneCard).toHaveCount(1);
  await expect(capstoneCard.getByRole('link')).toHaveCount(0);
  for (const [slug, repository] of [
    ['kookmin-ai-edge', 'https://github.com/steveandy-sudo/kookmin-autonomous-portfolio'],
    ['uav-waypoint', 'https://github.com/steveandy-sudo/uav-waypoint-portfolio'],
    ['vmodel-neuro-symbolic', 'https://github.com/steveandy-sudo/vmodel-driving-portfolio'],
  ]) {
    await page.goto(`/projects/${slug}/`);
    await expect(page.locator('.case-header').getByRole('link', { name: 'GitHub repository' })).toHaveAttribute('href', repository);
  }
  for (const route of ['/', '/projects/ai-sw-mobility/']) {
    await page.goto(route);
    await expect(page.locator('a[href*="github.com/steveandy-sudo/ai-sw-mobility-portfolio"]')).toHaveCount(0);
    const notice = page.locator('[data-repository-visibility="private"]').first();
    await expect(notice).toBeVisible();
    await expect(notice).toContainText('competition is ongoing');
  }
  await page.goto('/projects/kookmin-ai-edge/');
  await expect(page.getByRole('link', { name: 'driving integration code' })).toHaveAttribute('href', 'https://github.com/steveandy-sudo/kookmin-autonomous-portfolio/tree/main/src/xycar_map_nav');
  await expect(page.getByRole('link', { name: 'parking package', exact: true })).toHaveAttribute('href', 'https://github.com/steveandy-sudo/kookmin-autonomous-portfolio/tree/main/src/xycar_parking_nav');
  await expect(page.locator('a[href*="kookmin_autonomous_competition_teamKAI"]')).toHaveCount(0);
  await expect(page.locator('[data-media-slot]')).toHaveCount(0);
});
test('text enlargement and representative screenshots', async ({ page }, testInfo) => {
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    await page.goto('/');
    await page.screenshot({path:testInfo.outputPath(`home-${width}.png`),fullPage:true});
    await page.goto('/projects/kookmin-ai-edge/');
    await page.screenshot({path:testInfo.outputPath(`case-${width}.png`),fullPage:true});
  }
  await page.addStyleTag({content:'html { font-size: 200%; }'});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
});
