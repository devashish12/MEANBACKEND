const config=require('config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const _=require('lodash');
const {Register} =require('../models/register');
const mongoose=require('mongoose');
const express=require('express');
var router=express.Router();
const registerSchema=require('../models/register');

const {register}=require('./register');

router.post('/',async (req,res)=>{
    let register=await Register.findOne({Email:req.body.Email});
    if(!register) res.status(400).send('invalid useid or emailAddress');

    const validPassword=await bcrypt.compare(req.body.password,register.password);
    if(!validPassword) res.status(400).send('invalid email or password');
   const token= register.generateAuthToken();

    res.send(token);
});

module.exports=router;