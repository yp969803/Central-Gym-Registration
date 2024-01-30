const {User} = require('../models/user')
const axios = require("axios");

const isLogin= async(req, res, next)=>{
   try{
     
      const BearerToken= req.headers['authorization']

      if(!BearerToken){
         res.status(401).json("User not authenticated")
         return
      }
      
      const peopleRes = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            "Authorization": BearerToken,
          },
        }
      );
      
      let user = await User.findOne({email: peopleRes.data.email})
      if(user==null){
        res.status(401).json("User not authenticated")
        return
      }
      req.user= user
      next()

   }catch(e){
    
    res.status(401).json("User not authenticated")
    return
   }
}

module.exports = isLogin