const {test,expect} = require('@playwright/test');


test.only("Playwright Special Locators", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");

    await page.locator(".form-group input[name='name']").fill("Demo Test");
    await page.getByPlaceholder("Password").fill("123456");

    await page.getByRole("button", {name: "Submit"}).click();

    expect(await page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("Link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();

    await page.pause();
});