import { UserModel } from "../Models";
import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { login, password } = req.body;

        UserModel.findOne({ login }).then(
            (user) => {
                if (!user) return res.status(404).send({ message: "Not Found" });
                else {
                    if (user?.password === password) {
                        return res.status(200).send({ message: "Success", data: user._id });
                    } else return res.status(400).send({ message: "Incorrect Password" });
                }
            },
            () => {
                return res.status(500).send({ message: "Error" });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/signup", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { name, surname, login, password, status } = req.body;

        UserModel.create({ name, surname, login, password, status }).then(
            (doc) => {
                return res.status(201).send({ message: "Success", data: doc });
            },
            () => {
                return res.status(500).send({ message: "Error" });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

export default router;