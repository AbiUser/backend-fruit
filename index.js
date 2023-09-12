//Import Express
require('dotenv').config()
const express = require('express')
const cors = require('cors');
//Create our server by calling express (initiate server)
const app = express()
//port has to be set to above 1024
const port = process.env.PORT
//process.env.PORT
const fruits = require('./fruit.json')

//middleware- code that is executed between the request coming in and the response being sent
//AUTHENITIFICATION MIDDLEWARE
//app.use(startingPath, middleware_code)
//app.use('/fruits') //- middle ware will run for any request starting with /fruits

//app.get(path)- needs to be specific and can only use one path

//use next() to let request complete
app.use(cors())
app.use(express.json())

    //Create route - GET route (creates a path for the server to get data)
    //Creating our first "root" so it can handle a request and give a response
    //[server].[method].('<path>', callback)
    //req (request)/ res (response) - are both objects
    //'/home'- defines path of where response is sent to localhost:3000/home
//app.get('/home', (req, res) => {
     //sends status - no need to send any message/data
    //res.sendStatus(200).send("Hello");
  //res.send('Hello!')//sends status & message/data 'Hello World' from server
    //})

app.get('/', (req, res) => {
    res.send('Hello, Fruity!')
})

//Bind the server to a port (all communication from the server will be done via a computer's port)
//app.listen(<port>,() => {}) - is a callback
//app.listen(port, () => {
    //console.log(`Example app listening on port ${port}`)
//})

//route to return all the fruits
app.get('/fruits', (req, res) => {
    res.send(fruits)
})

//Route to return a specific fruit and it's info
//:<property> -> dynamic parameter
app.get('/fruits/:name', (req, res) => {
    //use name to then send the fruit back to the client
    //console.log(req)
    console.log(req.params.name) //req.params- gets all the dynamic parameters

    //toLowerCase()
    const name = req.params.name.toLowerCase();
    //find()
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)

    if (fruit == undefined) {
        res.status(404).send("the fruit doesn't exist")
    } else {
        res.send(fruit)
    }
    //consider when the fruit is found/ when fruit is not found
    //consider how to deal with capital letters vs no capital letters on the client side
})

const ids = fruits.map(fruit => fruit.id)
console.log(ids)
let maxId = Math.max(...ids);

//Create a new piece of fruit to the data
app.post('/fruits', (req, res) => {
    const fruitName = req.body.name;

    // req.body -> {"name": "FRUIT"}
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == fruitName.toLowerCase())

    if (fruit == undefined) {
        maxId += 1
        req.body.id = maxId
        // Add fruit to the data - add req.body to the fruits array
        fruits.push(fruitName)
        res.status(201).send(fruitName)

        res.send("Fruit successfully created!")
    } else {
        // Return an error
        res.status(400).send("fruit already exists")//send an error
    }
    // if (fruit.find()) { //check if it is already in data
    //     res.status(406).send("fruit already exists")//send an error
    // } else {
    //     console.log(fruit)
    //     res.send(fruit)
    // }
    
    //console.log(req)
    //console.log(fruit.name)

    res.send("New fruit created")
})

app.listen(port, () => {
    console.log(`App listening on ${port}`)
}) 

//node automatically sets a users IP address to localhost: 3000
//type web address "localhost:3000" to see output


// if (req.params.name) {
//     console.log(req.params.name) //req.params- gets all the dynamic parameters
//     res.send(`Return specific fruit with name ${req.params.name}`)
// } else {
//     res.sendStatus(404).send(`${req.params.name} cannot be found`)
// }