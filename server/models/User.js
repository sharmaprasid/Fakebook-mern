const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastname: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  picturepath: {
    type: String,
    default:"",
    
  },
  friends:{
    type:Array,
    default:[],
  },
  location:String,
  impression:Number,
  viewedProfile:Number,
  occupation:String,


},{timestamps:true});
const User= mongoose.model("User", userSchema);
module.exports= User;
