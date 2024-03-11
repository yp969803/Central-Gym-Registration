const express= require("express")
const app= express()
require("dotenv/config")
const cors = require("cors")
const {google} = require('googleapis')
const { dbInit } = require("./database")
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
})

const SPREADSHEET_ID= "1pbIZUElUjnHgtwoPUiR36BW25MlrW72goRFtzkLarIw"
app.use(cors())
dbInit()
app.use(express.json());
app.use(express.urlencoded())
app.use('/backend/auth', require('./routes/auth'))
app.use('/backend/user', require('./routes/user'))
app.use('/backend/admin', require('./routes/admin'))



app.listen(8000, ()=>{
    console.log(`Server is running on port 8000`)
})
