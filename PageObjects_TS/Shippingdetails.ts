import { Locator, Page } from "@playwright/test"

export class Shippingdetails{
    page: Page
    fname: Locator
    lname: Locator 
    pcode: Locator
    continue: Locator

    constructor(page:Page){
        this.page = page
        this.fname = page.locator("#first-name")
        this.lname = page.locator("#last-name")
        this.pcode = page.locator("#postal-code")
        this.continue = page.locator("#continue")
    }
    async enterUserDetails(fname:string,lname:string,pcode:string){
        await this.fname.fill(fname)
        await this.lname.fill(lname)
        await this.pcode.fill(pcode)
    }
    async clickContinue(){
        await this.continue.click()
    }
}
//module.exports = Shippingdetails