const {Schema, model} = require('mongoose');
//The above code is like below
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required:true,
    },
    email : {
        type: String,
        required:true,
        unique: true,
    },
    password : {
        type: String,
        required:true,
    },
},
    {timestamps:true},//time up date
);

module.exports = model("users",UserSchema);