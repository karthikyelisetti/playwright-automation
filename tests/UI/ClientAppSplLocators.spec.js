const {test, expect} = require('@playwright/test');

test('Website Client App Special Locators', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    // locators for the elements on the page
    const useremail = page.getByPlaceholder("email@example.com");
    const userpassword = page.getByPlaceholder("enter your passsword");
    const loginBtn = page.getByRole("button", {name: "Login"});

    // filling the login form and clicking the login button
    await useremail.fill("demotestemail@email.com");
    await userpassword.fill("jYDne_YM@$b@JW7");
    await loginBtn.click();

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await page.locator(".card b").first().waitFor();

    await products.filter({hasText: `${productName}`}).getByRole("button", {name: "Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
    

    await page.locator("div li").last().waitFor();
    await expect(page.getByText(`${productName}`)).toBeVisible();
    await page.getByRole("button", {name: "Checkout"}).click();

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
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name: "India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    await page.locator(".box").first().waitFor();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    // await page.locator(".em-spacer-1 [routerlink*=myorders]").click();
    // await page.locator("tbody").waitFor();

    // const rows = await page.locator("tbody tr");

    // for (let i = 0; i < await rows.count(); i++) {
    //     const rowOrderId = await rows.nth(i).locator("th").textContent();
    //     if (orderId.includes(rowOrderId)) {
    //         await rows.nth(i).locator("button").nth(i).click();
    //         break;
    //     }
    // }

    // const orderIdDetails = await page.locator(".col-text").textContent();
    // expect(orderId.includes(orderIdDetails)).toBeTruthy();

    await page.pause();

});