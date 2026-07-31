const base = require('@playwright/test')

exports.customtest = base.test.extend({
    testdatafororder:{
        username: "standard_user",
        password: "secret_sauce",
        product: "Sauce Labs Backpack"
    }
})