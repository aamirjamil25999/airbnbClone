// Core Module
const path = require('path');

// External Module
const express = require('express');
const multer = require('multer');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const db = require("./utils/database");
const {mongoConnect} = require('./utils/databasemongodb');
const { default: mongoose } = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://aamirjamil25999:completecoding@airbnbcluster.czqnybe.mongodb.net/yourDB?retryWrites=true&w=majority";


// const isLoggedIn = true;

// db.execute('SELECT * FROM homes')
// .then(([rows, fields]) =>{
//   console.log('Getting from ' ,rows);
// }).catch(error =>{
//   console.log('Error: ', error);
// })



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

const randomString = ()=>{
  const char = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += char.charAt(Math.floor(Math.random() * char.length));
  }
  return result;

}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const fileName = randomString(10) + '-' + file.originalname;
    cb(null, fileName);
  }

});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerOption = {
  storage,fileFilter
}

app.use(express.urlencoded());
app.use(multer(multerOption).single('photoUrl'));
app.use(express.static(path.join(rootDir, 'public')))
app.use("/uploads",express.static(path.join(rootDir, 'uploads')))
app.use("host/uploads",express.static(path.join(rootDir, 'uploads')))

app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    store: store,

}))
app.use((req,res,next)=>{
  // console.log("cookie middleware", req.get("cookie"))
  req.isLoggedIn = req.session.isLoggedIn;
  next()
})
app.use(storeRouter);
app.use(authRouter);
app.use("/host/host", (req, res, next) => {
  if (req.isLoggedIn) {
    console.log("✅ Access allowed to /host");
    next();
  } else {
    console.log("🚫 Access denied, redirecting to /login");
    res.redirect("/login");
  }
});

app.use("/host", hostRouter);





app.use(errorsController.pageNotFound);

const PORT = 3001;

// mongoConnect(()=> {
 
// })


mongoose.connect(DB_PATH).then(()=>{
  console.log("MongoDB Connected");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err)=>{
  console.log("Error while connecting to MongoDB", err);
})
