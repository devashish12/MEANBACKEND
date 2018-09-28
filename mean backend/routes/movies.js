const auth=require('../middleware/auth');
const express=require('express');
var router=express.Router();
const {Movies}=require('../models/movies');
const {genreSchema,Genre}=require('../models/genre');


router.get('/',async (req,res)=>{
    const movie=await Movies.find();
    res.send(movie);
});

router.post('/',async (req,res)=>{
const genre=await Genre.findById(req.body.genreId);
if(!genre) res.status(404).send('not found this genreId')

    let movie=new Movies({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate

    })
    movie=await movie.save();
    res.send(movie);

});
router.put('/:id',auth,async (req,res)=>{
    const genre=await Genre.findById(GenreId);
if(!genre) res.status(404).send('not found this genreId')
    const movie=await Movies.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate

    },{new:true})
    res.send(movie);
});
router.delete('/:id',auth,async (req,res)=>{
    const movie=await Movies.findByIdAndRemove(req.params.id);
    res.send(movie);
})


module.exports=router;