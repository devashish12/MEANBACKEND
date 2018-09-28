const express=require('express');
var router=express.Router();
const {Rental}=require('../models/rental');
const {Customer}=require('../models/customers');
const {Movies}=require('../models/movies');

router.get('/',async (req,res)=>{
    const rental=await Rental.find();
    res.send(rental);
});

router.post('/',async (req,res)=>{
    const customer=await Customer.findById(req.body.customerId);
    if(!customer) res.status(404).send("customerid is not found");

    const movie=await Movies.findById(req.body.movieId);
    if(!movie) res.status(404).send("moviesId is not found");

if(movie.numberInStock===0) return res.status(400).send('movie is not in stock');

    let rental=new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }

    })


    rental=await rental.save();
    movie.numberInStock--;
    
    movie.save();
    res.send(rental);

});
// router.put('/api/rental/:id',async (req,res)=>{
//     const rental=await Rental.findByIdAndUpdate(req.params.id,{
//         name:req.body.name,
//         isGold:req.body.isGold,
//         phone:req.body.phone

//     },{new:true})
//     res.send(rental);
// });
// router.delete('/api/rental/:id',async (req,res)=>{
//     const rental=await Rental.findByIdAndRemove(req.params.id);
//     res.send(rental);
// })


module.exports=router;