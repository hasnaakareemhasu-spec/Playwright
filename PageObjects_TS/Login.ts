import { Locator, Page } from "@playwright/test"

export class Login{
    page: Page
    username: Locator
    password: Locator
    login: Locator

    constructor(page:Page){
        this.page = page
        this.username = page.locator("#user-name")
        this.password = page.locator("#password")
        this.login = page.locator("#login-button")
    }
    async goto(){
        await this.page.goto("https://www.saucedemo.com")
    }
    async validLogin(uname:string,pass:string){
        await this.username.fill(uname)
        await this.password.fill(pass)
        await this.login.click()
    }
}
//module.exports = Login