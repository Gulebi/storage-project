import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const port: string = process.env.PORT || "3000";
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => console.log(`App running at http://localhost:${port}/`));
