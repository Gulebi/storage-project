const { UserModel } = require("../Models");
const { Router } = require("express");

const router = Router();

router.post("/login", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { email, password } = req.body;

        UserModel.findOne({ email }).then(
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

        const { username, email, password } = req.body;

        UserModel.create({ username, email, password }).then(
            (doc) => {
                return res.status(201).send({ message: "Success", data: doc._id });
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

module.exports = router;
