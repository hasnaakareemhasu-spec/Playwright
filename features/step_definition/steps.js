const { Given, When, Then } = require("@cucumber/cucumber");
const Pomanager = require("../../PageObjects/Pomanager");
const { chromium, expect } = require("@playwright/test");

const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(30 * 1000); // 30 seconds

Given('The username {string} and password {string} and click the Login button', async function (username, password) {
  this.pomanager = new Pomanager(this.page)
  let login = this.pomanager.getLogin()
  await login.goto()
  await login.validLogin(username,password)
});

When('The dashboard is displayed and the product {string} is added to the cart', async function (product) {
  let dashboard = this.pomanager.getDashboard()
  await dashboard.selectProduct(product)
  await dashboard.moveToCart()
});

Then('We can see our cart details and click on the checkout button', async function () {
  let cart = this.pomanager.getCart()
  await cart.checkout()
});

When('The Shipping details are entered and the Continue button is pressed', async function () {
  let details = this.pomanager.getShippingDetails()
  await details.enterUserDetails("Hasna","Kareem","97006")
  await details.clickContinue()
});

Then('We can see the product summary', async function () {
  this.summary = this.pomanager.getSummary()
  await this.summary.verifySummary()
});

When('We click on the Finish button', async function () {
  await this.summary.clickFinish()
});

Then('The order is placed and we get the message: Thank you for your order!', async function () {
  await expect(this.page.locator(".complete-header")).toHaveText("Thank you for your order!")
});



Given('The wrong username {string} and password {string} and click the Login button', async function (username,password) {

  await this.page.goto("https://www.saucedemo.com")
  await this.page.locator("#user-name").fill(username) //for an instance ID we use # in front of ID
  await this.page.locator("#password").fill(password)
  await this.page.locator("#login-button").click()
});

Then('Check the error message since incorrect username is provided', async function () {
  await expect(this.page.locator("h3[data-test='error']")).toHaveText("Epic sadface: Username and password do not match any user in this service")
});