const express = require("express");
const app = express();
const moviesRoute = require("./moviesRoute");
const bookRoute = require("./bookRoute");
const scheduleRoute = require("./scheduleRoute");
const cinemaRoute = require("./cinemaRoute");
const showTimeRoute = require("./showTimeRoute");
const genresRoute = require("./genresRoute");
const locationRoute = require("./locationRoute");
const authRoute = require("./authRoute")

app.use("/movies", moviesRoute);
app.use("/book", bookRoute);
app.use("/schedule", scheduleRoute);
app.use("/cinema", cinemaRoute);
app.use("/showtime", showTimeRoute);
app.use("/genres", genresRoute);
app.use("/location", locationRoute);
app.use("/auth", authRoute);


module.exports = app;
