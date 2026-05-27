const {test, expect} = require('@playwright/test');

test.only('Browser context UI Demo', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // locators for the elements on the page
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const alertMsg = page.locator("[style*='block']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await username.fill("rahulshettyacademy");
    await password.fill("123456");
    await signInBtn.click();

    // extract text from the alert and print it
    console.log(await alertMsg.textContent());

    // assertion to check if the alert contains the expected text
    await expect(alertMsg).toContainText("Incorrect");

    await password.fill("");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();

    // extract text from the page and cards title and print it
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    console.log(await page.title());

});

test('Page UI Demo', async ({page}) => {
    await page.goto("https://google.com/");
    console.log(await page.title());

    await expect(page).toHaveTitle("Google");
});
