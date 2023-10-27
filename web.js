const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const checkuserauth = require('../middleware/auth')
const ProductController = require('../controllers/ProductController')

//UserController Files
router.get('/getalluser', checkuserauth, UserController.getalluser)
router.post('/userinsert',UserController.userinsert)
router.post('/verifylogin',UserController.verifylogin)
router.get('/logout',UserController.logout)
router.get('/getuserdetails',checkuserauth,UserController.getuserdetails)

router.post('/updatepassword',checkuserauth,UserController.updatepassword)
router.get('/getsingleuser/:id',checkuserauth,UserController.GetsingleUser)
router.get('/deleteuser/:id',checkuserauth,UserController.DeleteUser)

//ProductController files

router.post('/createproduct',ProductController.createproduct)
router.get('/getallproduct', checkuserauth, ProductController.getallproduct)
router.get('/getproductdetails',checkuserauth,ProductController.getproductdetails)
router.get('/deleteproduct/:id',checkuserauth,ProductController.deleteproduct)
router.get('/getsingleproduct/:id',checkuserauth,ProductController.GetsingleProduct)



//ProductController files









module.exports = router