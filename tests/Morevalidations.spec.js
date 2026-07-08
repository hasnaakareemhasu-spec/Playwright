const {test,expect} = require("@playwright/test");

test('Popup Validations',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden() //take the div class name instead of simple classname from inspect window
    await page.locator("#login-button").click()
    await expect(page.locator(".error-message-container.error")).toBeVisible()

    await page.goto("https://selenium.qabible.in/index.php")
    //Navigating to Alerts and Modals->Javascript Alert 
    await page.locator("#alert-modal").click()
    await page.locator(".list-group-item").nth(4).click() //we have multiple elements with the same name
    
    //Java Script Confirm Box code written before clicking the yellow 'Click Me!' button in 'Java Script Confirm Box' section
    //after executing 'await page.locator(".btn.btn-warning").click()' code, this section will execute 
    //to display the confirmation box with OK and Cancel
    page.on('dialog',async dialog=>{
        await page.waitForTimeout(3000)
        await dialog.accept() //to click the OK button
        //await dialog.dismiss() //to click the cancel
    })
    //after the confirmation box code, clicking 'Click Me!' button in 'Java Script Confirm Box' section
    //this will execute first before the confirmation box display code
    await page.locator(".btn.btn-warning").click()

    //assertion to check whether the correct text have been displayed after pressing OK from confirmation dialog.
    await expect(page.locator("#confirm-demo")).toHaveText("You pressed OK!")
    
    //just to hover over the Others link in the page 
    await page.locator("#others").hover()

    //Frames/IFrames
    await page.goto("https://demoqa.com/frames")
    //we have 2 frames with the same content in the page - We need the specific frame (First frame) and its input
    const framepage = page.frameLocator("#frame1") //fetching the first or intended frame's ID
    //using the indended frame's ID, we are displaying the input text
    console.log(await framepage.locator("#sampleHeading").textContent()) 

    await page.pause()
})