var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var usersRouter = require("./routes/users");
var rolesRouter = require("./routes/roles");
var vehiclesRouter = require("./routes/vehicles");
var parkingsRouter = require("./routes/parkings");
var vehicleParkRouter = require("./routes/vehiclePark");
var app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/users", usersRouter);
app.use("/vehiclePark", vehicleParkRouter);
app.use("/roles",rolesRouter);
app.use("/vehicles",vehiclesRouter);
app.use("/parkings",parkingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => app.listen(PORT, console.log(`Sever running on port ${PORT}`)))
    .catch((error) => console.log(error.message));
mongoose.set("useFindAndModify", false);

module.exports = app;
