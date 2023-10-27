const mongoose = require('mongoose')
const UserSchema = new  mongoose.Schema ({
      name:{
        type:String,
        Required:true,
      },
      email:{
        type:String,
        Required:true,
      },
      password:{
        type:String,
        Required:true,
      },
     
      image:{
        public_id:{
            type:String,
        }   ,
        url:{
            type:String,
        },
      },
      role:{
        type:String,
        default:"User"   
      },

},{timestamps:true})
const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel
