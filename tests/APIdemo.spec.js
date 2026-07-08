const {test,expect} = require("@playwright/test");

test('Get Request - Fetch Users',async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/users') //the URL has been send
    //in response variable, we get the o/p like postman when we click on the send button after pasting the URL - 200Ok is the response 
    expect(response.ok()).toBeTruthy() //You will get an OK response which is to be true- 200OK
    const body = await response.json()
    expect(body.length).toBeGreaterThan(0)
    console.log(body[0].name)//we can pass name, username, email...whichever element we want
    console.log(body[1].name)
    console.log(body[1].email)
})