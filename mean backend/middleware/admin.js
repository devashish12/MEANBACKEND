
function admin(req,res,next){
    if(!req.body.isAdmin) return res.status(403).send('access denied');
       next();
    
}
module.exports=admin;