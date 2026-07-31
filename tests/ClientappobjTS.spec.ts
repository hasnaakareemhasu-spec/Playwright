import {test,expect} from "@playwright/test";
import { Pomanager } from "../PageObjects_TS/Pomanager";

const testdata = JSON.parse(JSON.stringify(require('../utils/placeordertestdata.json')))

test( 'Automation of order processing system using page object model',async( { page } ) =>{
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
    
    /*customtest.only("Customized Testcase", async({page,testdatafororder})=>{
        let pomanager = new Pomanager(page)
    
        let login = pomanager.getLogin()
        await login.goto()
        await login.validLogin(testdatafororder.username,testdatafororder.password) //accessing the data from JS
    
    
        let dashboard = pomanager.getDashboard()
        await dashboard.selectProduct(testdatafororder.product)
        await dashboard.moveToCart()
    
        let cart = pomanager.getCart()
        await cart.checkout()
    })*/