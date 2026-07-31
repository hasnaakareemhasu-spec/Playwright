class Login{
    constructor(page){
        this.page = page
        this.username = page.locator("#user-name")
        this.password = page.locator("#password")
        this.login = page.locator("#login-button")
    }
    async goto(){
        await this.page.goto("https://www.saucedemo.com")
    }
    async validLogin(uname,pass){
        await this.username.fill(uname)
        await this.password.fill(pass)
        await this.login.click()
    }
}
module.exports = Login