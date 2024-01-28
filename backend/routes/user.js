const express= require('express')
const router= express.Router()
const multer= require('multer')

const isLogin= require('../middlewares/isLogin')
const { User } = require('../models/user')

const upload = multer({ dest: "images/" });

router.get('/getUser', isLogin, async(req,res)=>{
    try{
      const email= req.query.email
      if(email==null){
        const user= req.user
        return res.status(200).json({user: user})
      }
      const user= await User.findOne({email: email})
      if(user==null){
        return res.status(404).json("User with this email does not exist")
      }

      return res.status(200).json({user: user})
      
    }catch(e){
       return  res.status(500).json("Internal server error")
    }
})

router.put('/changeSlot', isLogin, async (req,res)=> {
  try{
    let slot= req.query.slot;
    

    const user= await User.findOne({email:req.user.email})
    user.slot= slot
    await user.save()
    return res.status(200).json({user: user})
  }catch(e){
    return  res.status(500).json("Internal server error")
  }
    
})

router.put('/uploadImage', isLogin, upload.single("image"),async(req, res)=>{
    try{
    const imageName = req.file.filename;
    const user= await User.findOne({email:req.user.email})
    user.image= imageName
    await user.save();
    
    return res.status(200).send({"message":"Image uploaded successfully!"});
    }catch(e){
        return  res.status(500).json("Internal server error")
    }
})

router.get("/image", async(req, res) => {

    try{
    const email=  req.query.email;
     if(!email ){
        const imageName = req.user.image;
        const readStream = createReadStream(`images/${imageName}`);
        readStream.pipe(res);
        return
     }
     const user= await User.findOne({email: email})
      if(user==null){
        return res.status(404).json("User with this email does not exist")
      }
      const imageName = user.image;
      if (!imageName) {
        return  res.status(404).json('No Image for this user');
      }
      const readStream = createReadStream(`images/${imageName}`);
      readStream.pipe(res);
      return
    } catch(err) {
        return  res.status(500).json("Internal server error")
    }
});

router.get('/allSlots', isLogin, async(req, res)=>{
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