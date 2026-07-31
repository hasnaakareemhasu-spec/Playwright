import { Locator, Page } from "@playwright/test"

export class Cart{
    page: Page
    item: Locator
    check: Locator
    constructor(page:Page){
        this.page = page
        this.item = page.locator(".inventory_item_name")
        this.check = page.locator("#checkout")
    }
    async checkout(){
        await this.item.waitFor()
        await this.check.click()
    }
}
//module.exports = Cart

