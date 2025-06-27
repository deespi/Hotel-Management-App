const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {type: String , require},
    surname : {type: String , require},
    phone : {type: Number , require},
    email : {type: String , require},
    password : {type: String , require},
    isAdmin : {type: Boolean , require , default: false},
} , {
    timestamps : true,
})

module.exports = mongoose.model('users' , userSchema)