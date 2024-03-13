const express= require("express")
const app= express()
const cors = require("cors")

app.use(cors())

app.use(express.json());
app.use(express.urlencoded())


app.get('*',(req,res)=>{
 
    const path = req.path 
    if(path.startsWith("/backend/")){
        res.redirect("http://localhost:8000"+path)
        
    }
    res.redirect("http://localhost:3001"+path)
})
app.listen(3000, ()=>{
    console.log(`Server is running on port 3000`)
})
