require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const DBUtils = require('./DBUtils/dbConnection');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./helpers/passport');
const path = require('path');
const ejsMate = require('ejs-mate');
const app = express();
const imagePath = path.join(__dirname,'../public/images');
// console.log(imagePath);


// Set as EJS Template Engine 
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// in-built Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public/images", express.static(imagePath));
app.use(flash());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null; 
  next();
});

// Routes
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');

app.use('/', authRoutes);
app.use('/admin', adminRoutes);



// DB Connection and Server Start
const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URL;
const dbName = process.env.MONGO_DB_NAME;

if (port && dbUrl && dbName) {
    app.listen(port, () => {
      if (dbUrl && dbName) {
        DBUtils.connectionDB(dbUrl, dbName)
          .then((dbResponse) => {
            console.log(dbResponse);
          })
          .catch((error) => {
            if (error) console.log(error);
            process.exit(0); // node process exits
          });
      }
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
