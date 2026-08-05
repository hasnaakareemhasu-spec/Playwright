//Document Object Model
const {test,expect} = require("@playwright/test");

test('@web Client app automation',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await page.locator("#user-name").fill("standard_user")
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()
    await page.waitForLoadState('networkidle') //makes the network idle
    await page.locator(".inventory_item_name").first().waitFor()//makes the network wait for some time
    const title = await page.locator(".inventory_item_name").allTextContents() //to get all the 6 titles under the same calss
    console.log(title)
    //add to cart - first item
    const product = page.locator(".inventory_item")
    const productname = 'Sauce Labs Backpack'
    const count = await product.count()
    for(let i = 0;i < count;i++){
        if(await product.nth(i).locator(".inventory_item_name").textContent() === productname){
            await product.nth(i).locator("text=Add to cart").click() //in the case of button, we can pass "text=<button name>" in locator()
            break;
        }
    }
    await page.locator("#shopping_cart_container").click()
    //we are bringing a delay - 
    //When we come to a new page we can slow down the process 
    //page.locator(".inventory_item_name") finds the element(s)
    //waitFor() pauses until the element is attached/visible and ready
    await page.locator(".inventory_item_name").waitFor()
    await page.locator("#checkout").click()
    //check out page
    await page.locator("#first-name").fill("Hasna")
    await page.locator("#last-name").fill("Kareem")
    await page.locator("#postal-code").fill("97006")
    await page.locator("#continue").click()
    //after checking out - Overview page
    await page.locator(".summary_info").waitFor()//delay
    await expect(page.locator(".summary_subtotal_label")).toHaveText("Item total: $29.99")
    await page.locator("#finish").click()
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
    //await page.locator("#back-to-products").click() //going back to the products page
    //await page.pause()// if we want to pause the page
})

