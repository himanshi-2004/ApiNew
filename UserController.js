const UserModel = require("../models/User");
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken')

cloudinary.config({
    cloud_name: "dwy8hd761",
    api_key: "822826584515219",
    api_secret: "tOwVhCBcpcPxothANYLY3kaYcX4",
    // secure: true
  });




class UserController {
  static getalluser = async (req, res) => {
    try {
     // res.send("Hello user");
              const users = await UserModel.find()
              //console.log(user)
              res.status(201).json({
                status:"success",
                message:"Successful",
                users,
              })
    } catch (err) {
      console.log(err);
    }
  };

  static getuserdetails = async (req, res) => {
    try {
          const{id,name,email} = req.data1
     // res.send("Hello user");
              const user = await UserModel.findById(id)
              //console.log(user)
              res.status(201).json({
                status:"success",
                message:"Successful",
                user,
              })
    } catch (err) {
      console.log(err);
    }
  };

  static userinsert = async (req, res) => {
    //  try{
    //     console.log(req.body)
    //  }
    //  catch(err){
    //     console.log(err)
    //  }
    //console.log(req.body)

    const { name, email, password, confirmpassword } = req.body;
   // const image = req.files.image;
    //  console.log(image)
    // const imageupload = await cloudinary.uploader.upload(image.tempFilePath, {
    //   folder: "profileimageapi",
    // });
    //console.log(imageupload)

    const user = await UserModel.findOne({ email: email });
    // console.log(user)
    if (user) {
      res
        .status(401)
        .json({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
    } else {
      if (name && email && password && confirmpassword) {
        if (password == confirmpassword) {
          try {
            const hashpassword = await bcrypt.hash(password, 10);
            //console.log(hashpassword);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              // image: {
              //   public_id: imageupload.public_id,
              //   url: imageupload.secure_url,
              // },
            });
            await result.save();
            res.status(201).json({
              status: "success",
              message: "Registration Successfully 😃🍻",
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          res
            .status(401)
            .json({
              status: "failed",
              message: "password & confirmpassword does not match",
            });
        }
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "all field required" });
      }
    }
  }


  static verifylogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await UserModel.findOne({ email: email })

            if (user != null) {
                const isMatched = await bcrypt.compare(password, user.password)
                if (isMatched) {
                    const token = jwt.sign({ ID: user._id }, 'himanshisharma@mca019920');
                    // console.log(token)
                    res.cookie('token', token)
                    res.status(201).json({
                        status: 'success',
                        message: 'successful',
                        token: token,
                        user,
                    })
                } else {
                    res
                        .status(401)
                        .json({ status: "failed", message: "email or password is not valid" });
                }
            } else {
                res
                    .status(401)
                    .json({ status: "failed", message: "you are not register user" });
            }
          } else {
            res
                .status(401)
                .json({ status: "failed", message: "all field required" });
        }
    } catch (err) {
        console.log(err);
        }
    }

static logout = async (req, res) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })

    res.status(200).json({
      success: true,
      message: 'Logged Out',
    })
  } catch (err) {
    console.log(error)
    }
  }
      

 static updatepassword = async (req, res) => {
  try {
      const { id } = req.data1
      const { old_password, new_password, cpassword } = req.body;
      if (old_password && new_password && cpassword) {
          const user = await UserModel.findById(id);
          const ismatch = await bcrypt.compare(old_password, user.password);
          if (!ismatch) {
              res
                  .status(401)
                  .json({ status: "failed", message: "old password is incorrect" });
          } else {
              if (new_password !== cpassword) {
                  res
                      .status(401)
                      .json({ status: "failed", message: "  Password and confirm password do not match" });
                    } else {
                      const newHashpassword = await bcrypt.hash(new_password, 10);
                      await UserModel.findByIdAndUpdate(id, {
                          $set: { password: newHashpassword },
                      });
                      res.status(201).json({
                          status: 'success',
                          message: 'PASSWORD UPDATED SUCCESSFULLY 😃',
                          
                      })

                  }
              }
          } else {
              return res.status(400).json({
                  status: 'failed',
                  message: 'All fiels required',
              })
          }
      } catch (error) {
          console.log(error)
        }
    }

//get single user start
static GetsingleUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.log(error)
    }
  }




static DeleteUser = async (req, res) => {
  try {
    const userDelete = await UserModel.findById(req.params.id)

    if (!userDelete) {
      return res
        .status(500)
        .json({ status: '500', message: 'user not !! found  😪  ' })
    }
// To delete the data from database
    await UserModel.deleteOne(userDelete)

    res.status(200).json({
      status: 'deleted successfully',
      message: '  Successfully user deleted 🥂🍻',
    })
  } catch (err) {
    console.log(err)
    }
  }

}
module.exports = UserController;
