class Shippingdetails{
    constructor(page){
        this.page = page
        this.fname = page.locator("#first-name")
        this.lname = page.locator("#last-name")
        this.pcode = page.locator("#postal-code")
        this.continue = page.locator("#continue")
    }
    async enterUserDetails(fname,lname,pcode){
        await this.fname.fill(fname)
        await this.lname.fill(lname)
        await this.pcode.fill(pcode)
    }
    async clickContinue(){
        await this.continue.click()
    }
}
module.exports = Shippingdetails