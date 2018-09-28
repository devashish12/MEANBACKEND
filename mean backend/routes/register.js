const auth=require('../middleware/auth');
const jwt=require('jsonwebtoken');
const config=require('config');
const bcrypt=require('bcrypt');
const _=require('lodash');
const {Register} =require('../models/register');

const mongoose=require('mongoose');
const express=require('express');
var router=express.Router();
//const registerSchema=require('../models/register');


router.get('/me',auth, async (req,res)=>{
   const register= await Register.findById(req.body._id).select('-password');
   res.send(register);
});
router.post('/', async (req,res)=>{
let register=await Register.findOne({Email:req.body.Email});
if(register) res.status(400).send("already register emailId");

register=new Register(_.pick(req.body,["name","Email","password","isAdmin"]));
const salt=await bcrypt.genSalt(10);
console.log(salt);

register.password=await bcrypt.hash(register.password,salt);

    await register.save();
    const token= register.generateAuthToken();

    res.header('x-auth-header',token).send(_.pick(register,["_id","name","Email","isAdmin"]));
})

module.exports=router;
