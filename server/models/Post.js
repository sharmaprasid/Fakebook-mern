const mongoose  = require("mongoose");

const postSchema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      location: String,
      description: String,
      picturepath: String,
      userPicturepath: String,
      likes: {
        type: Map,
        of: Boolean,
      },
      comments: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
  );
  
  const Post = mongoose.model("Post", postSchema);
  module.exports=Post;