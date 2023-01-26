const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv= require('dotenv');

// register function
const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      picturepath,
      occupation,
      location,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: passwordHash,
      picturepath,
      occupation,
      location,
      viewedProfile: Math.floor(Math.random() * 1000),
      impression: Math.floor(Math.random() * 1000),
    });
    const savedUser= await newUser.save()
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({error:error.msg});
  }
};


//log in
const login= async(req,res)=>{
    try {
        
        const{email,password}=req.body;
        const user= User.findOne({email:email});
        if(!user){
            return res.status(400).json({msg:"User not found"});
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid credential"});
        }
        const token= jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
}
module.exports={login,register};
