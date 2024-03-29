var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var config = require("config");
var cors = require("cors");

var indexRouter = require("./routes/index");
var medicinesRouter = require("./routes/api/medicines");
var usersRouter = require("./routes/api/users");
var ordersRouter = require("./routes/api/orders");
var cartRouter = require("./routes/api/cartItems");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/medicines", medicinesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/cart", cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect(config.get("db"), { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo..."))
  .catch((err) => console.log(err.message));

module.exports = app;
