const {test} = require('@playwright/test');

test.only('Test for Assignment 1', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    // locators for the elements on the page
    const useremail = page.locator("#userEmail");
    const userpassword = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    
    // filling the login form and clicking the login button
    await useremail.fill("demotestemail@email.com");
    await userpassword.fill("jYDne_YM@$b@JW7");
    await loginBtn.click();

    const cardTitles = page.locator(".card b");

    // wait for the page to load completely before extracting text from the card.
    // This will wait for the network to be idle, which means that there are no ongoing network requests for at least 500 ms.
    // await page.waitForLoadState("networkidle"); // not suggested by playwright
    await page.locator(".card b").first().waitFor();
    const titles = await cardTitles.allTextContents();

    console.log(titles);

});