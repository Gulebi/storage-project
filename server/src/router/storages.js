const { StorageModel } = require("../Models");
const { Router } = require("express");

const router = Router();

router.post("/create", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { name, adminId } = req.body;

        await StorageModel.create({ name, adminId });

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        await StorageModel.findByIdAndDelete(id);

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/addProduct/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id: storageId } = req.params;
        const { productId, buyingPrice, sellingPrice } = req.body;

        await StorageModel.findByIdAndUpdate(storageId, {
            $push: {
                products: {
                    _id: productId,
                    buyingPrice,
                    sellingPrice,
                    buyingPriceHistory: [buyingPrice],
                    sellingPriceHistory: [sellingPrice],
                },
            },
        });

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/productOperation/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id: storageId } = req.params;
        const { productId, operationName } = req.body;

        if (operationName === "buying") {
            await StorageModel.findOneAndUpdate(
                { _id: storageId, "products._id": productId },
                { $inc: { "products.$.totalAmount": 1 } }
            );
            await StorageModel.findByIdAndUpdate(storageId, {
                $push: { operationsHistory: { productId, operationName } },
            });
        } else if (operationName === "selling") {
            await StorageModel.findOneAndUpdate(
                { _id: storageId, "products._id": productId },
                { $inc: { "products.$.totalAmount": -1 } }
            );
            await StorageModel.findByIdAndUpdate(storageId, {
                $push: { operationsHistory: { productId, operationName } },
            });
        } else if (operationName === "deleting") {
            await StorageModel.findByIdAndUpdate(storageId, { $pull: { products: { _id: productId } } });
            await StorageModel.findByIdAndUpdate(storageId, {
                $push: { operationsHistory: { productId, operationName } },
            });
        }

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/changeProductPrice/:id", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id: storageId } = req.params;
        const { productId, operationName, newPrice } = req.body;

        if (operationName === "buying") {
            await StorageModel.findOneAndUpdate(
                { _id: storageId, "products._id": productId },
                { $set: { "products.$.buyingPrice": newPrice } }
            );
            await StorageModel.findOneAndUpdate(
                { _id: storageId, "products._id": productId },
                { $push: { "products.$.buyingPriceHistory": newPrice } }
            );
        } else if (operationName === "selling") {
            await StorageModel.findOneAndUpdate(
                { _id: storageId, "products._id": productId },
                { $set: { "products.$.sellingPrice": newPrice } }
            );
            await StorageModel.findOneAndUpdate(
                { _id: storageId, "products._id": productId },
                { $push: { "products.$.sellingPriceHistory": newPrice } }
            );
        }

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

module.exports = router;
