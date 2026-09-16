const { Before, After, Status, AfterStep } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

Before(async function(){ //for scenarios
    console.log("I am First")
    const browser = await chromium.launch({headless: false})
    const context = await browser.newContext()
    this.page =await context.newPage()
})

After(async function(){ //for scenarios
    console.log("I am Last")
})

AfterStep(async function({result}) { //for steps - if any of the step failed
    if(result.status === Status.FAILED){
        const buffer = await this.page.screenshot()
        await this.page.screenshot({path:'screenshot1.png'})
        this.attach(buffer.toString('base64'),'base64:image/png')
        console.log("screenshot logged")
    }
})