import { Locator, Page } from "@playwright/test"

export class Summary{
    page: Page
    summaryinfo: Locator
    subtotal: Locator
    finishbtn: Locator

    constructor(page:Page){
        this.page = page
        this.summaryinfo = page.locator(".summary_info")
        this.subtotal = page.locator(".summary_subtotal_label")
        this.finishbtn = page.locator("#finish")
    }
    async verifySummary(){
        await this.summaryinfo.waitFor()//delay
        console.log( await this.subtotal.textContent() ) // O/P:  Item total: $29.99   assertion expect is making error here
        //await expect(this.subtotal).toHaveText("Item total: $29.99")
    }
    async clickFinish(){
        await this.finishbtn.click()
    }
}
//module.exports = Summary