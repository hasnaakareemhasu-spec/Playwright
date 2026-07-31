//Page Object Model
const { test,expect } = require("@playwright/test");
const Pomanager = require("../PageObjects/Pomanager");
const { customtest } = require("../utils/testbase");
//JSON file stores the hard coded values like username, password..etc
const testdata = JSON.parse(JSON.stringify(require('../utils/placeordertestdata.json'))) //importing the JSON file here

test( 'Automation of order processing system using page object model',async( { page } ) =>{

    /*let login=new Login(page)
    await login.goto()
    await login.validLogin("standard_user","secret_sauce")

    let dashboard = new Dashboard(page)
    await dashboard.selectProduct('Sauce Labs Backpack')
    await dashboard.moveToCart()

    let cart = new Cart(page)
    await cart.checkout()

    let details = new Shippingdetails(page)
    await details.enterUserDetails("Hasna","Kareem","97006")
    await details.clickContinue()

    let summary = new Summary(page)
    await summary.verifySummary()
    await summary.clickFinish()

    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")*/

    //all the objects from above code is defined in pomanager.js
    //accessing those objects from Pomanager.js
    let pomanager = new Pomanager(page)

    let login = pomanager.getLogin()
    await login.goto()
    await login.validLogin(testdata.username,testdata.password) //accessing the data from JSON


    let dashboard = pomanager.getDashboard()
    await dashboard.selectProduct(testdata.product)
    await dashboard.moveToCart()

    let cart = pomanager.getCart()
    await cart.checkout()

    let details = pomanager.getShippingDetails()
    await details.enterUserDetails("Hasna","Kareem","97006")
    await details.clickContinue()

    let summary = pomanager.getSummary()
    await summary.verifySummary()
    await summary.clickFinish()

    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
})

customtest("Customized Testcase", async({page,testdatafororder})=>{
    let pomanager = new Pomanager(page)

    let login = pomanager.getLogin()
    await login.goto()
    await login.validLogin(testdatafororder.username,testdatafororder.password) //accessing the data from JS


    let dashboard = pomanager.getDashboard()
    await dashboard.selectProduct(testdatafororder.product)
    await dashboard.moveToCart()

    let cart = pomanager.getCart()
    await cart.checkout()
})