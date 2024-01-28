const express= require('express')
const isAdmin = require('../middlewares/isAdmin');
const { Slot } = require('../models/slot');
const { User } = require('../models/user');
const router= express.Router()

router.post("/getAdmin", isAdmin, (req, res)=>{
    try{
      
        const adminUser= req.user;
        return req.status(200).json({user: adminUser})
    }catch(e){
        return res.status(500).send("Internal server error")
    }
})


router.post("/addSlot", isAdmin, async(req,res)=>{
    try{

        const {name, start_time, end_time, totalSeats}= req.body
        if(!totalSeats){
            totalSeats=50
        }
        const preSlot= Slot.findOne({name: name})
        if(preSlot){
            return res.status(400).send("This slot name already taken");
        }
        const slot= new Slot({
            name: name,
            start_time: start_time,
            end_time: end_time,
            totalSeats: totalSeats
        })
        await slot.save();

        return res.status(200).json({slot: slot})
        
    }catch(e){
        return res.status(500).send("Internal server error")
    }
})


router.put("/editSlot/:slotName", isAdmin, async(req, res)=>{
    try{

        const slotName= req.params.slotName
        const slot= Slot.findOne({name: slotName})
        if (!slot) {
            return res.status(404).send('The slot does not exist');
        }
        const {start_time, end_time,  totalSeats} = req.body;
        if(!totalSeats){
            totalSeats= slot.totalSeats
        }
        slot.totalSeats= totalSeats;
        slot.start_time= start_time
        slot.end_time= end_time
         await slot.save()
         return res.status(200).json({slot: slot})
    }catch(e){
        return res.status(500).send("Internal server error")
    }
} )


router.delete("/delete/:slotName", isAdmin, async(req, res)=>{
    try{

        const slotName= req.params.slotName
        const slot= await Slot.findOne({name: slotName})
        if (!slot) {
            return res.status(404).send('The slot does not exist');
        }
        const users=  await User.find({slot: slotName})
        users.forEach(async(user)=>{
            user.slot=null 
            await user.save()
        })
        const del= await Slot.findOneAndDelete({name: slotName})
        return res.status(200).send("Slot deleted successfully")
        

    }catch(e){
        return res.status(500).send("Internal server error")
    }
})



router.get('/allSlots', isAdmin, async(req, res)=>{
    try{

        const slots= await  Slot.find();
        const newSlots=slots.map(async(slot)=>{
            const users= await User.find({slot: slot.name})
            slot.users= users 
            return slot
        })
        return res.status(200).json({slots: newSlots})

        

    }catch(e){
           return res.status(500).send("Internal server error")


    }
})













module.exports= router