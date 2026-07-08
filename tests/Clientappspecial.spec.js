//Convert Clientapp.spec.js file using special locators in tests/Clientappspecial.spec.js file

const {test,expect} = require("@playwright/test");

test('Client app automation using special locators',async({page})=>{
    await page.goto("https://www.saucedemo.com")

    //1. login page
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.getByRole("button",{name:'Login'}).click()

    //2. Products page
    await page.waitForLoadState('networkidle') //makes the network idle
    await page.getByText("Sauce Labs Backpack").first().waitFor()

    const title = await page.locator(".inventory_item_name").allTextContents() //to get all the 6 titles under the same calss
    console.log(title)

    //*********************To discuss - product is adding to cart*********************
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

    //*********************To discuss - Shopping cart icon*********************
    await page.locator("#shopping_cart_container").click()
    //await page.getByRole("link", { name: '1' }).click()
    
    //3. Cart page
    //we are bringing a delay-When we come to a new page we can slow down the process
    await page.getByText("Your Cart").waitFor() 
    await page.getByText("Sauce Labs Backpack").waitFor()
    await page.getByRole("button",{name:'Checkout'}).click()

    //4. Check out page
    await page.getByPlaceholder("First Name").fill("Hasna")
    await page.getByPlaceholder("Last Name").fill("Kareem")
    await page.getByPlaceholder("Zip/Postal Code").fill("97006")
    await page.getByRole("button",{name:'Continue'}).click()
    
    //5. Overview page
    await page.getByText("Checkout: Overview").waitFor()//delay
    await expect(page.getByText("Item total: $29.99")).toBeTruthy() //assertion
    await page.getByText("Item total: $29.99").isVisible()
    await page.getByRole("button",{name:'Finish'}).click()

    //6. Order complete page
    await expect(page.getByText("Thank you for your order!")).toBeTruthy() //assertion
    await page.getByText("Thank you for your order!").isVisible()

    /*//back to home
    await page.getByRole("button",{name:'Back Home'}).click()*/

    await page.pause()// if we want to pause the page
})
