const express= require("express");
const {getUserPosts,getFeedPosts,likedPosts}=require("../controllers/post");
const verifyToken= require('../middleware/auth');
const router= express.Router();


//Read
router.get("/:userId/posts",verifyToken,getUserPosts);
router.get("/",verifyToken,getFeedPosts);




// update
router.patch("/:id/like",verifyToken,likedPosts);
module.exports=router;