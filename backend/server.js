const express= require("express")
const app= express()
require("dotenv/config")
const cors = require("cors")
const { dbInit } = require("./database")

app.use(cors())
dbInit()
app.use(express.json());
app.use(express.urlencoded())
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))
app.use('/admin', require('./routes/admin'))

app.listen(8000, ()=>{
    console.log(`Server is running on port 8000`)
})