const express = require('express')
const bodyParser = require('body-parser')
const db = require ('./model/db')
const userrouter = require ('./routes/user')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(userrouter)


app.listen(3001,()=>{
    console.log('server is running on port 3001')
})