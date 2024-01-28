const jwt = require('jsonwebtoken');

const isAdmin=(req, res, next)=>{
    try{
        const Bearertoken = req.header('authorization')
        if(!Bearertoken){
            return  res.status(401).send({msg: "No token provided"})
        }
        const token= Bearertoken.replace(/^Bearer\s/, '')
        jwt.verify(token, "sportsadmin", (err, user) => {
            if (err) return res.sendStatus(403); // Forbidden
            req.user = user;
            next();
        })        

    }catch(e){
         return res.status(500).send("Internal server error")
    }
}

module.exports=isAdmin