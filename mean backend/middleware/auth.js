
const jwt=require('jsonwebtoken');
const config=require('config');


function auth(req,res,next){
    const token=req.header('x-auth-header');
    if(!token) return res.status(401).send('invalid token');
try{
    const decoded=jwt.verify(token,config.get('jwtprivateKey'));
    req.body=decoded;
    next();
}catch(ex){res.status(401).send('invalid token');}
 }

 module.exports=auth;