const { ProductModel } = require("../Models");
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        ProductModel.find({}).then(
            (docs) => {
                return res.status(200).send({ message: "Success", data: docs });
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

router.get("/getById/:id", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        ProductModel.findById(id).then(
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

router.get("/getByStorageId/:id", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        ProductModel.find({ storageId: id }).then(
            (docs) => {
                return res.status(200).send({ message: "Success", data: docs });
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

router.post("/create", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { name, image, description, category, manufacturer, manufacturerPrice } = req.body;

        ProductModel.create({ name, image, description, category, manufacturer, manufacturerPrice }).then(
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

router.put("/change/:id", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;
        const { name, image, description, category, manufacturer, manufacturerPrice } = req.body;

        ProductModel.findByIdAndUpdate(id, {
            name,
            image,
            description,
            category,
            manufacturer,
            manufacturerPrice,
        }).then(
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

router.delete("/delete/:id", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        ProductModel.findById(id).then(
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

module.exports = router;
