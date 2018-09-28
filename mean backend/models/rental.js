const mongoose=require('mongoose');

const rentalSchema=new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength:255
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minlength:5,
                maxlength:255
            }
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate:{
                type:Number,
                required:true
            }
        }),
        required:true
    },
    dateOut:{
        type:Date,
        default:Date.now(),
        required:true

    },
    dateReturend:{
        type:Date

    },
    // rentalFee:{
    //     type:Number,
    //     required:true
    // }
});


// function validateRental(){
//     const Schema={
//         customerId:joi.String().required,
//         movieId:joi.String().required
//     }
//     const result=joi.validate()
// }
 const Rental=mongoose.model('Rental',rentalSchema);

exports.rentalSchema=rentalSchema;
exports.Rental=Rental;