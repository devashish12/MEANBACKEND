const express=require('express');
var router=express.Router();
const {Customer}=require('../models/customers');

router.get('/',async (req,res)=>{
    const customer=await Customer.find();
    res.send(customer);
});

router.post('/',async (req,res)=>{
    let customer=new Customer({
        name:req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone

    })
    customer=await customer.save();
    res.send(customer);

});
router.put('/:id',async (req,res)=>{
    const customer=await Customer.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone

    },{new:true})
    res.send(customer);
});
router.delete('/:id',async (req,res)=>{
    const customer=await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
})


module.exports=router;