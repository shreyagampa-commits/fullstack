const express=require('express')
const path=require('path')
const router =express.Router()

router.get('/',(req,res)=>{
 res.sendFile(path.join(__dirname,'../templates/login.html'));
})
router.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/about.html'));
})
router.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/signup.html'));
})
module.exports=router 
