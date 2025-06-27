const mongoose = require("mongoose");

var mongoDBURL = 'MONGO-DB-URL'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`MongoDB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`MongoDB Connection Successfull`);
})

module.exports = mongoose