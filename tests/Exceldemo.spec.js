//Document Object Model
//Merge TC1,2 and 3 ina single TC  from Exceldemo_self.spec.js
// use the functions readexcelfile and writeexcelfile from ExcelDemo.js file instead of TC2
const {test , expect} = require("@playwright/test");
const ExcelJS = require("exceljs");
const fs = require("fs");

test( "Excel Downloading and Uploading with Read and Write Functions", async( { page } ) => {

    const excelFilePath = "C:/Users/hasna/Downloads/Obsqura Testing.xlsx"
    //opens selenium qa site - to download excel file
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole( "link", { name: 'Table' } ).click()
    await page.getByRole( "link", { name: 'Table Data Download' } ).click()

    const [ download ] = await Promise.all([
        page.waitForEvent( 'download' ),
        page.getByRole( "button", { name: 'Excel' } ).click()
    ])

    await download.saveAs( excelFilePath )
    
    //WriteExcelFile function
    async function WriteExcelFile(filepath,searchvalue,changevalue,change){

        const workbook = new ExcelJS.Workbook() 
        await workbook.xlsx.readFile(filepath)
        const worksheet = workbook.getWorksheet("Sheet1") 
        const output = await ReadExcelFile(worksheet,searchvalue)
        const cell = worksheet.getCell(output.row, output.col+change)
        cell.value = changevalue
        await workbook.xlsx.writeFile(filepath)
    }

    //ReadExcelFile function
    async function ReadExcelFile(worksheet,searchvalue){

        let output = {row: -1, col: -1}

        worksheet.eachRow((row,rownumber)=>{
            row.eachCell((cell,colnumber)=>{ 
                if(cell.value === searchvalue){
                    output.row = rownumber
                    output.col = colnumber
                }
            })
        })
        return output
    }

  
  await page.goto("https://the-internet.herokuapp.com/upload")
    // Prefer setting files directly on the file input rather than relying on a filechooser event.
    // This is more reliable across browsers and test runners.
  await page.locator("#file-upload").setInputFiles(excelFilePath)

  await page.locator("#file-submit").click()
  await expect(page.locator("#uploaded-files")).toContainText("Obsqura Testing.xlsx")
  await page.pause()

  /*
  //Opens the Tiiny Host website - to upload excel file
  await page.goto("https://tiinyhost/")
  //await page.waitForLoadState('networkidle')

  const [ upload ] = await Promise.all([
    page.waitForEvent( 'filechooser' ),
    page.getByRole( "button", { name: 'Upload file', exact: true } ).click()
  ])

  await upload.setFiles(excelFilePath)
  await expect( page.locator(".tr-landing-domain-input.form-control") ).toHaveValue( "obsqura-testing" )

  await page.getByPlaceholder( "Email" ).fill( "hasnaakareemhasu@gmail.com" )
  await page.getByRole( "button", { name: 'Continue' } ).click()

  //
  await expect( page.locator( ".success-box" ) ).toContainText( "Success" )*/
  

})