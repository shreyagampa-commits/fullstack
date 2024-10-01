
const mongoose = require('mongoose');
//import mongoose from 'mongoose';
const a= new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    email:{type:String},
    phonenumer:{type:String}

})
 const User=mongoose.model('User',a);
 module.exports=User;


