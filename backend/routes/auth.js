const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const axios = require("axios");
const jwt = require('jsonwebtoken');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIERECT_URL = process.env.REDIERECT_URL;
const ADMIN_USERNAME= process.env.ADMIN_USERNAME
const ADMIN_PASSWORD= process.env.ADMIN_PASSWORD


router.post("/login/user", async (req, res) => {
  try {
    const { code } = req.body;
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIERECT_URL,
      grant_type: "authorization_code",
    });
    const access_token = tokenRes.data.access_token;
    console.log(access_token)
    const peopleRes = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
      }
    );

    const enrollment= peopleRes.data.family_name
    const branch= (peopleRes.data.hd).replace(/\.iitr\.ac\.in$/, '');
    let user = await User.findOne({ email: peopleRes.data.email });
   
    if(user){
        return res.status(200).json({user: user, access_token: access_token})
    }
    if(!((peopleRes.data.email).endsWith("iitr.ac.in"))){
        return res.status(401).send('Invalid Email');
    }
    const newUser= new User({
        email:  peopleRes.data.email,
        name: peopleRes.data.given_name,
        enrollment: Number(enrollment),
        branch: branch
    })

    await newUser.save()
    return res.status(200).json({user: newUser, access_token: access_token})

  } catch (e) {
   return res.status(500).send("Internal server error");
  }
});

router.post("/login/admin", async(req,res)=>{
    try{
        const {username, password}= req.body;
        if(!(username==ADMIN_USERNAME&&password==ADMIN_PASSWORD)){
            return res.status(401).send("Wrong Credentials")
        }
        const user={username:username}
        const token=jwt.sign(user , "sportsadmin");
        return res.status(200).json({access_token: token})

        

    }catch(e){
       return res.status(500).send("Internal server error")
    }
})


module.exports = router;
