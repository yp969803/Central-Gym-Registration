const mongoose= require('mongoose')


require('dotenv').config();


const mongoString = process.env.DATABASE_STRING



const dbInit= async()=>{
   await mongoose.connect(mongoString, 
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then((res)=>console.log('Mongodb connected' ))
}

module.exports={
    dbInit
}