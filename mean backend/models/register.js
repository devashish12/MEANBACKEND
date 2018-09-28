const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const config=require('config');

const registerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    Email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:255
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
});
registerSchema.methods.generateAuthToken=function(){
    
   const token= jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
  
    return token;
}
const Register= mongoose.model('Register',registerSchema);

exports.registerSchema=registerSchema;
exports.Register=Register;