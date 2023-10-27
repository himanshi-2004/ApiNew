const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')


const checkuserauth = async(req,res,next)=>{
         //console.log('auth')
         const {token} = req.cookies
         if(!token){
            res
            .status(401)
            .json({
              status: "failed",
              message: "unauthorised user please not open ",
            });
         }
         else{
            const verifytoken= jwt.verify(token,'himanshisharma@mca019920')
            //console.log(verifytoken)
            const data  = await UserModel.findOne({_id:verifytoken.ID})
            //console.log(data)
            req.data1 = data
            next()
         }
}
module.exports = checkuserauth