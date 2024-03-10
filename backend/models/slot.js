const mongoose= require('mongoose')
const slotSchema= new mongoose.Schema({
    name:{
        type: String, 
        required: true,
        unique: true
    },
    start_time: {
        type: String,
        required: true,
        
    },
    
    end_time:{
      type:String,
      required: true
    },
    totalSeats:{
        type: Number,
        default :50
    },
    filledSeats:{
        type: Number,
        default: 0
    }

})

const Slot= mongoose.model('Slot', slotSchema)
module.exports={Slot}