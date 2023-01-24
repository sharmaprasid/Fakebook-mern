
const express = require("express");
const bodyParser= require('body-Parser');
const cors= require('cors');
const dotenv= require('dotenv');
const multer= require('multer');
const helmet= require('helmet');
const morgan= require('morgan');

const mongoose= require('mongoose');
const path= require('path');
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const postRoutes=require('./routes/post')
const {register}= require('./controllers/auth');
const {createPost}= require('./controllers/post');
const verifyToken = require("./middleware/auth");



/*config*/

dotenv.config(); //use to envoke dotenv files
const app= express()//envoke express and save instance as app
app.use(express.json());
app.use(helmet());//for ensuring safety request
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan("common"))//used to handle log in
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
app.use("/assets", express.static(path.join(__dirname,'public/assets')));
/*file Storage*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/assets')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname )
    }
  })
  
  const upload = multer({ storage })
  //routes with file
  app.post('/auth/login', upload.single("picture"),register);
  app.post('/posts',verifyToken,upload.single("picture"),createPost);
  // routes
  app.post('/auth',authRoutes);
  app.post('/users',userRoutes);
  app.post('/posts',postRoutes);


  const PORT=process.env.PORT||3002;
  mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));