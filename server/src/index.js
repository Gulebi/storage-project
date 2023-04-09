const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const router = require("./router/index.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

mongoose.connect(process.env.MONGODB_URI).then(
    () => {
        console.log("App has connected to MongoDB");
        app.listen(port, () => console.log(`App running at http://localhost:${port}/`));
    },
    (err) => console.error(err)
);
