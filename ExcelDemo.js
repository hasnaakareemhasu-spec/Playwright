//Document Object Model
const ExcelJS = require("exceljs") //importing the dependency library file from package.json

//reading from an excel file & writing to an excel file
async function WriteExcelFile(filepath,searchvalue,changevalue,change){ //defines an async function

    const workbook = new ExcelJS.Workbook() 

    await workbook.xlsx.readFile(filepath)

    const worksheet = workbook.getWorksheet("Sheet1") //single quotes or double quotes

    //to print whole data from the excel file
    /*worksheet.eachRow((row,rownumber)=>{
        row.eachCell((cell,colnumber)=>{ //colnumber = column number
            console.log(cell.value) // To read the whole data from the excel file
        })
    })*/

   const output = await ReadExcelFile(worksheet,searchvalue)

   //Finds the specific cell using the row and column values returned by ReadExcelFile.
   //const cell = worksheet.getCell(output.row, output.col)
   const cell = worksheet.getCell(output.row, output.col+change)

   //Changes the value of that cell to the text Hasna Kareem.
   //cell.value = "Hasna Kareem" //To replace the first cell value with my name
   cell.value = changevalue


   //Saves the updated workbook back to the same Excel file.
   await workbook.xlsx.writeFile(filepath)
}
//WriteExcelFile() // calling the function to output whole data

//Defines another async function that scans the worksheet.
async function ReadExcelFile(worksheet,searchvalue){

    //Creates an object called output with two properties:
    // row and col
    // Both start with -1 as default values.
    let output = {row: -1, col: -1}

    //Starts looping through every row in the worksheet.
    // rownumber gives the current row number.
    worksheet.eachRow((row,rownumber)=>{

        //Loops through each cell in the current row.
        // colnumber gives the current column number.
        row.eachCell((cell,colnumber)=>{ //colnumber = column number

            //Checks whether the current cell contains the text Airi Satou.
            //if(cell.value === "Airi Satou"){
            if(cell.value === searchvalue){

                //Stores the row number where the matching value was found.
                output.row = rownumber

                //Stores the column number where the matching value was found.
                output.col = colnumber
            }
        })
    })

    //Returns the row and column information back to the caller.
    return output
}

//Calls the main function so the program runs.
WriteExcelFile("C:/Users/hasna/Downloads/Obsqura Testing.xlsx","Bruno Nash","Newyork",2)

//Activity: 