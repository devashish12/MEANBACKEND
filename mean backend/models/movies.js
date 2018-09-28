const mongoose=require('mongoose');
const {genreSchema}=require('./genre');


const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number ,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        required:true
    }
});
 

const Movies=mongoose.model('Movies',movieSchema);

exports.movieSchema=movieSchema;
exports.Movies=Movies;