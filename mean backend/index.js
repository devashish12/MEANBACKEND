const config=require('config');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const customers=require('./routes/customers');
const genres=require('./routes/genre');
const movies=require('./routes/movies');
const rentals=require('./routes/rental');
const register=require('./routes/register');
const auth=require('./routes/auth');
app.use(express.json());

config.get('jwtPrivateKey');

console.log(config.get('name'));

mongoose.connect('mongodb://localhost/sudhash')
.then(()=>console.log("connected to database"))
.catch(err=>console.error("error",err.message));

app.use('/api/customer',customers);
app.use('/api/genre',genres);
app.use('/api/movie',movies);
app.use('/api/rental',rentals);
app.use('/api/register',register);
app.use('/api/auth',auth);
  

app.listen(3000,()=>{
    console.log("server listen at port 3000");
    
})

