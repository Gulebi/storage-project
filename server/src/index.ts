import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";

import router from "./router";

const port: number = parseInt(process.env.PORT!) || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

mongoose.connect(process.env.MONGODB_URI!).then(
    () => {
        console.log("App has connected to MongoDB");
        app.listen(port, () => console.log(`App running at http://localhost:${port}/`));
    },
    (err) => console.error(err)
);
