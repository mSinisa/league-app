const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user/user");
const adminRoutes = require("./routes/admin/admin");
const dayRoutes = require("./routes/admin/days");
const divisionRoutes = require('./routes/admin/divisions');

const app = express();

mongoose.connect("mongodb+srv://sm:sina123@cluster0-pxdmd.mongodb.net/leagueNew?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("db connected"))
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.json());
app.use(cors());

//ROUTES
app.use(userRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/days", dayRoutes);
app.use("/admin/days/:dayId/divisions", divisionRoutes);
//SERVER
const port = 8082
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});