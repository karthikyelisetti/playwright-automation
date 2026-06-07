const {test, expect} = require('@playwright/test');

test('Test for Assignment 1', async ({page}) => {
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

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    // wait for the page to load completely before extracting text from the card.
    // This will wait for the network to be idle, which means that there are no ongoing network requests for at least 500 ms.
    // await page.waitForLoadState("networkidle"); // not suggested by playwright due to nettwork traffic.
    await page.locator(".card b").first().waitFor();
    // const titles = await productTitles.allTextContents();
    // console.log(titles);

    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*=cart]").click();

    await page.locator("div li").last().waitFor();
    const bool = await page.locator(`h3:has-text('${productName}')`).isVisible();
    expect(bool).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();

    page.locator(".container").waitFor();
 
    const cardNumber = '4542 9931 9292 2293';
    const cardCVV = '123';
    const cardName = 'John Doe';
    const coupon = 'rahulshettyacademy';
    
    await page.locator("input[type=text]").nth(0).fill(cardNumber);
    await page.locator("input[type=text]").nth(1).fill(cardCVV);
    await page.locator("input[type=text]").nth(2).fill(cardName);
    await page.locator("input[type=text]").nth(3).fill(coupon);
    await page.locator("button:has-text('Apply Coupon')").click();

    // selecting the country from the dropdown.
    await page.locator("[placeholder='Select Country']").pressSequentially("ind", {delay: 150});
    const dropDown = await page.locator(".ta-results");
    await dropDown.waitFor();
    const optionsCount = await dropDown.locator("button").count();

    for (let i = 0; i < optionsCount; i++) {
        const text = await dropDown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            dropDown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".action__submit").click();

    await page.locator(".box").first().waitFor();
    // assertion for the order confirmation message.
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    await page.locator(".em-spacer-1 [routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").nth(i).click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    // await page.pause();

});