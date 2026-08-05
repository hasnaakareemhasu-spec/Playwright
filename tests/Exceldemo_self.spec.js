//automate the ExcelDemo.Js file
//1. Download the excel file from selenium site: https://selenium.qabible.in/index.php
//2. Make the changes - What we have given in ExcelDemo.js file - Open that Excel file, find a value, and change it
//3. Upload the file into the site: https://tiiny.host/

/* *****updates start - after reviewing this file
//Merge TC1,2 and 3 in a single TC  
// use the functions readexcelfile and writeexcelfile from ExcelDemo.js file instead of TC2
//modified code in Exceldemo.spec.js
updates end***** */

//Document Object Model
const {test , expect} = require("@playwright/test");

const ExcelJS = require("exceljs");

//TC1 - Excel Downloading:page represents the browser tab
test( "Excel Downloading", async( { page } ) => {

  //The browser opens the Selenium demo website.
  await page.goto("https://selenium.qabible.in/index.php")

  //To click the “Table” link on the page.
  await page.getByRole( "link", { name: 'Table' } ).click()

  //To click the “Table Data Download” link.
  await page.getByRole( "link", { name: 'Table Data Download' } ).click()

  //Wait for the download event - Child Window Concept: the script is waiting for a file download.
  //This starts waiting for the download to happen while the next action is performed.
  const [ download ] = await Promise.all([

    //It listens for the browser to start downloading a file.
    page.waitForEvent( 'download' ),

    //To click the “Excel” button to trigger the download.
    page.getByRole( "button", { name: 'Excel' } ).click()

  ])

  //Save with a custom name in your downloads folder
  await download.saveAs( 'C:/Users/hasna/Downloads/Obsqura Testing.xlsx' )  
})

//TC2 - ReadExcelFile and WriteExcelFile test case
test( "To find a value in the Excel sheet and Excel file is updated correctly", async() => {

  //It sets the value to search for in the Excel sheet.
  const searchValue = "Bruno Nash"
  //It sets the new value that will be written.
  const changeValue = "Oregon"
  //Defines how many columns to move to the right from the found value.
  //First Column is zeroth position, Column+change is the 'Office' column 0+2
  const change = 2

  //Creates a new Excel workbook object
  const workbook = new ExcelJS.Workbook()
  //Opens the downloaded Excel file from disk
  await workbook.xlsx.readFile( 'C:/Users/hasna/Downloads/Obsqura Testing.xlsx' )

  //Selects the first sheet, named "Sheet1"
  const worksheet = workbook.getWorksheet( "Sheet1" )
  //Creates an object to store the location of the searched value
  //It starts with -1 to show that nothing has been found yet
  let output = { row: -1, col: -1 }

  //Loops through each row in the sheet
  worksheet.eachRow( ( row, rownumber ) => {
    //Loops through each cell in the current row
    row.eachCell( ( cell, colnumber ) => {
      //Checks whether the current cell contains the target value
      if( cell.value === searchValue ){
        //Stores the row number and column number where the value was found
        output.row = rownumber
        output.col = colnumber
      }
    })
  })

  //Gets a cell located two columns to the right of the found value.
  const cell = worksheet.getCell( output.row, output.col + change )
  //Changes that cell’s value to "Oregon"
  cell.value = changeValue
  //Saves the updated Excel file back to the same location
  await workbook.xlsx.writeFile( 'C:/Users/hasna/Downloads/Obsqura Testing.xlsx' )

  //Creates a fresh workbook object to read the saved file again
  const updatedWorkbook = new ExcelJS.Workbook()
  //Reads the updated Excel file
  await updatedWorkbook.xlsx.readFile( 'C:/Users/hasna/Downloads/Obsqura Testing.xlsx' )
  //Selects the same sheet again
  const updatedWorksheet = updatedWorkbook.getWorksheet( "Sheet1" )
  //Reads the updated cell from the newly loaded workbook
  const updatedCell = updatedWorksheet.getCell( output.row, output.col + change )

  //Verifies that the file was updated correctly
  expect( updatedCell.value ).toBe( changeValue )
  console.log( changeValue )
  //Confirms the value in memory is also "Oregon"
  expect( cell.value ).toBe( "Oregon" )
}) 

//TC3 - Uploading the excel file into the TiinyHost site
test( "Uploading the excel sheet to TiinyHost", async( { page } )=>{

  const excelFilePath = "C:/Users/hasna/Downloads/Obsqura Testing.xlsx"
  await page.goto("https://the-internet.herokuapp.com/upload")
    // Prefer setting files directly on the file input rather than relying on a filechooser event.
    // This is more reliable across browsers and test runners.
  await page.locator("#file-upload").setInputFiles(excelFilePath)

  await page.locator("#file-submit").click()
  await expect(page.locator("#uploaded-files")).toContainText("Obsqura Testing.xlsx")
  await page.pause()
/*
  //Opens the Tiiny Host website
  await page.goto("https://tiiny.host/")
  
  //Defines the path of the file to upload
  const excelFilePath = "C:/Users/hasna/Downloads/Obsqura Testing.xlsx"

  //Child Window concept  -
  const [ upload ] = await Promise.all([
    // Prepares to handle the file selection dialog
    page.waitForEvent( 'filechooser' ),
    //Clicks the upload button
    await page.getByRole( "button", { name: 'Upload file', exact: true } ).click()
  ])

  //Selects and uploads the Excel file
  //open the file picker dialog->select the file from the given path->upload it to the website
  await upload.setFiles( excelFilePath )

  //Verifies that obsqura-testing is displaying after uploading the file
  await expect( page.locator(".tr-landing-domain-input.form-control") ).toHaveValue( "obsqura-testing" )

  //Fills the email field
  await page.getByPlaceholder( "Email" ).fill( "hasnaakareemhasu@gmail.com" )
  //Clicks Continue to proceed
  await page.getByRole( "button", { name: 'Continue' } ).click()

  //Verifies that a success message appears
  //await expect( page.locator( ".success-box" ) ).toContainText( "Success" )
*/


})

/* *****updates start - after reviewing this file
//Merge TC1,2 and 3 in a single TC  
// use the functions readexcelfile and writeexcelfile from ExcelDemo.js file instead of TC2
//modified code in Exceldemo.spec.js
updates end***** */