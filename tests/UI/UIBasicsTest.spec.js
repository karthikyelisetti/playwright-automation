const {test, expect} = require('@playwright/test');

test.only('Browser context UI Demo', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();

    console.log(await page.locator("[style*='block']").textContent());

    console.log(await page.title());
});

test('Page UI Demo', async ({page}) => {
    await page.goto("https://google.com/");
    console.log(await page.title());

    await expect(page).toHaveTitle("Google");
});
