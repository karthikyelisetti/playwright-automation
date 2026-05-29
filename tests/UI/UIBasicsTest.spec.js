const {test, expect} = require('@playwright/test');

test('Browser context UI Demo', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // locators for the elements on the page
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const alertMsg = page.locator("[style*='block']");
    const cardTitles = page.locator(".card-body a");

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
    // In case the below textContent() is commented, playwright will not wait for the page to load and will exit.
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    console.log(await page.title());

    console.log(await cardTitles.allTextContents());

});

test('Page UI Demo', async ({page}) => {
    await page.goto("https://google.com/");
    console.log(await page.title());

    await expect(page).toHaveTitle("Google");
});

test('UI Controls', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");
    const radiobuttons = page.locator(".radiotextsty");
    const okayBtn = page.locator("#okayBtn");
    const checkbox = page.locator("#terms");
    const signInBtn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");

    // filling the login form and clicking the login button
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    
    await radiobuttons.last().click();
    await okayBtn.click();

    await dropdown.selectOption("consult");
    await checkbox.click();

    // assertion to check if the value is selected correctly
    console.log(await radiobuttons.last().isChecked());
    await expect(radiobuttons.last()).toBeChecked();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test.only('Child window handler', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        // wait for the new page to open and get the reference to it
        // This is necessary because when we click the link, it will open a new tab and we need to switch to that tab to perform actions on it.
        // If we don't wait for the new page to open, we might try to perform actions on the old page which will lead to errors.
        context.waitForEvent('page'), // Listen for any new page pending,rejected,fullfilled
        documentLink.click(), // this will open a new page (tab)
    ]);

    const redText = await newPage.locator(".red").textContent();
    console.log(redText);

    const arrayText = redText.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").fill(domain);
    await page.pause(); // This will pause the execution and open the Playwright Inspector 
    // where we can perform actions on the page and see the state of the elements.
    // We can also use this to debug our tests.
    
    console.log(await page.locator("#username").textContent());

});