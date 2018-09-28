const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const express=require('express');
var router=express.Router();
const {Genre}=require('../models/genre');

router.get('/',async (req,res)=>{
    const genre=await Genre.find();
    res.send(genre);
});

router.post('/',auth,async (req,res)=>{
    let genre=new Genre({
       name:req.body.name

    })
    genre=await genre.save();
    res.send(genre);

});
router.put('/:id',auth,async (req,res)=>{
    const genre=await Genre.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        
    },{new:true})
    res.send(genre);
});
router.delete('/:id',[auth,admin],async (req,res)=>{
    const genre=await Genre.findByIdAndRemove(req.params.id);
    res.send(genre);
})


module.exports=router;