const mongoose = require("mongoose");
const roomSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    capacity:{type:Number , required:true},
    type:{type:String, required:true},
    costperday:{type:Number, required:true},
    imageurls:[],
    currentbookings:[],
    description:{
        type:String,
        required:true
    }
})

const roomModel = mongoose.model('rooms' , roomSchema)

module.exports = roomModel