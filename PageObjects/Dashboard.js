class Dashboard{
    constructor(page){
        this.page = page
        this.item = page.locator(".inventory_item_name")
        this.product = page.locator(".inventory_item")
        this.cart = page.locator("#shopping_cart_container")

    }
    async selectProduct(productname){
        await this.page.waitForLoadState('networkidle') //makes the network idle
        await this.item.first().waitFor()//makes the network wait for some time
        const title = await this.item.allTextContents() //to get all the 6 titles under the same calss
        console.log(title)
        //add to cart - first item
        //const product = page.locator(".inventory_item")
        //const productname = 'Sauce Labs Backpack'
        const count = await this.product.count()
        for(let i = 0;i < count;i++){
            if(await this.product.nth(i).locator(".inventory_item_name").textContent() === productname){
                await this.product.nth(i).locator("text=Add to cart").click() //in the case of button, we can pass "text=<button name>" in locator()
                break;
                }
            }
        }
        async moveToCart(){
            await this.cart.click()
        }
}
module.exports = Dashboard