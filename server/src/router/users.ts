import { UserModel } from "../Models";
import { Router } from "express";

const router = Router();

router.get("/getById/:id", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        UserModel.findById(id).then(
            (doc) => {
                return res.status(200).send({ message: "Success", data: doc });
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

router.put("/addStorage/:id", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;
        const { id: storageId, status } = req.body;

        UserModel.findByIdAndUpdate(id, { $push: { storages: { storageId, status } } }).then(
            (doc) => {
                return res.status(200).send({ message: "Success", data: doc });
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
