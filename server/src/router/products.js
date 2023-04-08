const { ProductModel } = require("../Models");
const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { page = 1, limit = 10, sortField = "name", dir = "asc", search = "" } = req.query;

        const products = await ProductModel.find({ name: { $regex: search } })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ [sortField]: dir });

        const count = await ProductModel.countDocuments({ name: { $regex: search } });

        return res.status(200).send({ message: "Success", data: { products, count } });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error", data: error });
    }
});

router.get("/getById/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = awaitProductModel.findById(id);

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/create", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { name, image, description, category, manufacturer, manufacturerPrice } = req.body;

        const mRes = await ProductModel.create({ name, image, description, category, manufacturer, manufacturerPrice });

        return res.status(201).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.put("/change/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;
        const { name, image, description, category, manufacturer, manufacturerPrice } = req.body;

        const mRes = await ProductModel.findByIdAndUpdate(id, {
            name,
            image,
            description,
            category,
            manufacturer,
            manufacturerPrice,
        });

        return res.status(201).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/delete/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        await ProductModel.findByIdAndDelete(id);

        return res.status(200).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

module.exports = router;
