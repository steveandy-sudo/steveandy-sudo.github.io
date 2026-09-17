import { test, expect } from '@playwright/test';
const routes = ['/', '/ko/', '/projects/kookmin-ai-edge/', '/projects/ai-sw-mobility/', '/projects/camera-v2i-e2e/', '/projects/uav-waypoint/', '/projects/vmodel-neuro-symbolic/'];
for (const width of [1440, 768, 390, 320]) {
  test(`all routes remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
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
test('keyboard, language links, PDFs and development slot visibility', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await page.getByRole('link', { name: '한국어', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang','ko');
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  expect(await page.locator('#cv a').count()).toBe(2);
  await page.goto('/projects/kookmin-ai-edge/');
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
