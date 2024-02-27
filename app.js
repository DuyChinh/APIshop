var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require("express-ejs-layouts");
var session = require("express-session");
var flash = require("connect-flash");
var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customers');
const productRouter = require("./routes/products");
const adminRouter = require("./routes/admin");
const cartRouter = require("./routes/carts");
const addressRouter = require("./routes/addresses");
const authMiddleware = require("./middlewares/auth.middleware");
const cors = require("cors");
const passport = require("passport");
const { User } = require("./models/index");
const passportLocal = require("./passport/passport.local");


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(
  session({
    secret: "dc",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use("local", passportLocal);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  //Read data from api
  const user = await User.findByPk(id);
  done(null, user);
});


app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customerRouter);
app.use("/products", productRouter);
app.use("/admin", authMiddleware, adminRouter);
app.use("/carts", cartRouter);
app.use("/addresses", addressRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
