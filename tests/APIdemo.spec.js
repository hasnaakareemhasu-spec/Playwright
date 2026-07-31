//Document Object Model
const {test,expect} = require("@playwright/test");

//GET method
test('@api Get Request - Fetch Users',async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/users') //the URL has been send
    //in response variable, we get the o/p like postman when we click on the send button after pasting the URL - 200Ok is the response 
    expect(response.ok()).toBeTruthy() //You will get an OK response which is to be true- 200OK
    const body = await response.json()
    expect(body.length).toBeGreaterThan(0)
    console.log(body[0].name)//we can pass name, username, email...whichever element we want
    console.log(body[1].name)
    console.log(body[1].email)
    //console.log(body)// The entire Body contents will be displayed
})

//POST method
test('@api Post Request Create Users',async({request})=>{
    const response = await request.post('https://jsonplaceholder.typicode.com/users',{ //post method carries the URL and data as well
        data:{
            name:'John Doe',
            email:'john@gmail.com'
        }
    })
    expect(response.status()).toBe(201)
    const responseBody = await response.json()
    expect(responseBody.name).toBe('John Doe') //assertion - We only need one assertion its either name or email
    expect(responseBody.email).toBe('john@gmail.com')
})