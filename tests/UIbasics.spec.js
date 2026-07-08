const {test,expect} = require("@playwright/test");

//older method of writing a testcase
test('First testcase',async function(){

})

//newer method
//CSS locators: Element ID and Class Name are the CSS locators
//test.only is using for executing this testcase only from this file
//test.only("Browser context playwright test",async({browser})=>{ 
test("Browser context playwright test",async({browser})=>{ 
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://www.google.com")
    console.log(await page.title())

    //starting to automate the saucedemo.com page
    await page.goto("https://www.saucedemo.com")

    //with incorrect username and correct password
    await page.locator("#user-name").fill("standard_user123") //for an instance ID we use # in front of ID
    await page.locator("#password").fill("secret_sauce")
    await page.locator("#login-button").click()

    //to check the error message since we have given incorrect username
    await expect(page.locator("h3[data-test='error']")).toHaveText("Epic sadface: Username and password do not match any user in this service")
    //to print the whole text content of error message
    console.log(await page.locator("h3[data-test='error']").textContent())
    //to check whether the error message contains a specific text
    await expect(page.locator("h3[data-test='error']")).toContainText("Epic sadface")

    //with correct username and password
    await page.locator("#user-name").fill("")//emptying the current/incorrect username given in above line of code
    await page.locator("#user-name").fill("standard_user")//giving the correct username for the username field - 
    //since we have given correct password above, we don't have to duplicate the password code here
    await page.locator("#login-button").click()

    //since we have 6 elements in the next page (after login) with same class name: inventory_item_name
    //taking the first element- first () or nth(0) and printing
    console.log(await page.locator(".inventory_item_name").first().textContent())//for an instance class, we use . in front of class name
    //taking the next or second element and printing
    console.log(await page.locator(".inventory_item_name").nth(1).textContent())
    //taking all the 6 elements and printing
    const carttitles = await page.locator(".inventory_item_name").allTextContents()
    console.log(carttitles)

    await page.pause()
})

//assertion
test("Page context playwright test",async({page})=>{ //since we are calling page as a parameter here, we don't need to creat a objects inside
    await page.goto("https://www.google.com")
    console.log(await page.title())
    await expect(page).toHaveTitle("Google") // to check whether we get the correct page title in prev code of line
})

//UI controls automation
test("UI Controls",async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.locator("//a[normalize-space()='Input Form']").click()
    await page.locator("//a[normalize-space()='Checkbox Demo']").click()
    await page.locator("#gridCheck").check()
    await expect(page.locator("#gridCheck")).toBeChecked() //assertion1 for checkbox- Way1
    expect(await page.locator("#gridCheck").isChecked()).toBeTruthy()//assertion2 for checkbox - Way2
    await page.locator("//a[normalize-space()='Radio Buttons Demo']").click()
    await page.locator("#inlineRadio1").check()
    await expect(page.locator("#inlineRadio1")).toBeChecked()//assertion for radio button
    await page.locator("#inlineRadio24").check()
    expect(await page.locator("#inlineRadio24").isChecked()).toBeTruthy()//assertion
    await expect(page.locator("#inlineRadio24")).toBeChecked()//assertion
    await page.locator("//a[normalize-space()='Select Input']").click()
    await page.locator("#single-input-field").selectOption("Yellow")
    await expect(page.locator("#single-input-field")).toHaveValue("Yellow")//assertion for dropdown selected value
    await page.locator("//a[normalize-space()='Form Submit']").click()
    await page.locator("#validationCustom01").fill("Hasna")
    await page.locator("#validationCustom02").fill("Kareem")
    await page.locator("#validationCustomUsername").fill("hasnaakareem")
    await page.locator("#validationCustom03").fill("Beaverton")
    await page.locator("#validationCustom04").fill("Oregon")
    await page.locator("#validationCustom05").fill("97006")
    await page.locator("#invalidCheck").check()
    await page.locator(".btn.btn-primary").click() //class name starts with a dot and if a space is in between class name there also u put a dot (instead of "btn btn-primary", ".btn.btn-primary")
    await expect(page.locator("#message-one")).toHaveText("Form has been submitted successfully!")//assertion for displayed test after submittting the form
    await page.locator("//a[normalize-space()='Simple Form Demo']").click()
    await page.locator("#single-input-field").fill("Hello,World!")
    await page.locator("#button-one").click()
    await expect(page.locator("#message-one")).toHaveText("Your Message : Hello,World!")//assertion for the message display

    await page.pause()
})

//Child windows and new tab automation
test('Child window and new tab handling',async({browser})=>{ //here we are passing a browser context object 'browser' inside async
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://www.google.com")
    const [childpage] = await Promise.all([
        context.waitForEvent('page'),
        page.evaluate(()=>window.open("https://www.github.com"))
    ])
    const newtab = await context.newPage()
    await newtab.goto("https://www.saucedemo.com")
    console.log("Child Window and New Tab Opened Successfully")
    await page.pause()
})

//first prirority in playwright goes to Special locators
//second prirority in playwright goes to - CSS locators
//third prirority in playwright goes to - Xpath (Selectorshub)
//using special locators
test.only('Special Locators',async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    //await page.locator("//a[normalize-space()='Input Form']").click()
    //getByRole( for links and buttons)
    //getByLabel( for checkboxes and radiobuttons)
    await page.getByRole("link",{name:'Input Form'}).click() //
    //await page.locator("//a[normalize-space()='Checkbox Demo']").click()
    await page.getByRole("link",{name:'Checkbox Demo'}).click()
    await page.getByLabel("Click on this check box").check() 
    //await page.locator("//a[normalize-space()='Radio Buttons Demo']").click()
    await page.getByRole("link",{name:'Radio Buttons Demo'}).click()
    await page.getByLabel("45 to 60").check() 
    //await page.locator("//a[normalize-space()='Select Input']").click()
    await page.getByRole("link",{name:'Select Input'}).click()
    await page.getByLabel("Select Color").selectOption("Red")
    //await page.locator("//a[normalize-space()='Form Submit']").click()
    await page.getByRole("link",{name:'Form Submit', exact: true}).click() //if same names present in the website, exact:true should be used
    //exact: true will take the link 'Form Submit' from instead of 'Ajax Form Submit' from the site 
    await page.getByPlaceholder("First name").fill("Hasna")
    await page.getByPlaceholder("Last name").fill("Kareem")
    await page.getByPlaceholder("Username").fill("hasnakareem")
    await page.getByPlaceholder("City").fill("Beaverton")
    await page.getByPlaceholder("State").fill("Oregon")
    await page.getByPlaceholder("Zip").fill("97006")
    await page.getByLabel("Agree to terms and conditions").check()
    await page.getByRole("button",{name:'Submit form'}).click()
    await page.getByRole("link",{name:'Simple Form Demo'}).click()
    await page.getByPlaceholder("Message").fill("Hello, World!")
    await page.getByRole("button",{name:'Show Message'}).click()
    await page.getByText("Your Message : Hello, World!").isVisible()
    
    await page.pause()
})
