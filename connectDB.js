const mongoose = require('mongoose')
const connectDB = ()=>{
     //for local db
    return mongoose.connect(process.env.LIVE_URL)
                            
          .then(()=>{
               console.log("connection successful")
          })
          .catch((err)=>{
            console.log(err)
          })
}
module.exports = connectDB

