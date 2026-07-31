const { devices } = require("@playwright/test")

//basic configuration
const config = ({
  testDir:"./tests",
  retries:1,
  workers:3,
  timeout:40*1000,
  expect:{
    timeout:40*1000,},
  reporter:'html',
  projects:[{
    name:'safari',
    use:{
      browsername:'webkit',
      headless:true,
      screenshot:'on',
      trace:'on'
    },
  },
  {
    name:'chrome',
    use:{
      browsername:'chromium',
      headless:false,
      screenshot:'off',
      trace:'on',
      //viewport:{width:720,height:720} //For a specific sized chrome window
      //...devices['iPhone 11'], //to run or simulate the program in a specific device
      ignoreHttpsErrors: true,
      Permissions:['geolocation'],
      video:'on'
    }
  }]
})
module.exports = config