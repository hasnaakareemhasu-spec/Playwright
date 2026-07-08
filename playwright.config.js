//basic configuration
const config = ({
  testDir:"./tests",
  timeout:40*1000,
  expect:{
    timeout:40*1000,},
  reporter:'html',
  use:{browsername:'chromium',
  headless:false
  },
})
module.exports = config