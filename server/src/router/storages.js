const { StorageModel } = require("../Models");
const { Router } = require("express");
const { Types, isValidObjectId } = require("mongoose");

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

router.get("/:id/exists", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        let exists;

        if (isValidObjectId(id)) {
            const mRes = await StorageModel.exists({ _id: new Types.ObjectId(id) });
            exists = !!mRes;
        } else {
            exists = false;
        }

        return res.status(200).send({ message: "Success", data: exists });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/:id/delete", async (req, res) => {
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

router.get("/:id/getProducts", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await StorageModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products._id",
                    foreignField: "_id",
                    as: "productsDetails",
                },
            },
            {
                $project: {
                    name: 1,
                    products: {
                        $map: {
                            input: "$products",
                            as: "product",
                            in: {
                                $mergeObjects: [
                                    "$$product",
                                    {
                                        $first: {
                                            $filter: {
                                                input: "$productsDetails",
                                                cond: { $eq: ["$$this._id", "$$product._id"] },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        ]);

        return res.status(200).send({ message: "Success", data: mRes[0]?.products });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/:id/getBalance", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await StorageModel.findById(id, { totalMoney: 1 });

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/:id/setBalance", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;
        const { balance } = req.body;

        await StorageModel.findByIdAndUpdate(id, { totalMoney: balance });

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/:id/findProduct", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;
        const { productCode } = req.body;

        const mRes = await StorageModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(id),
                },
            },
            {
                $set: {
                    products: {
                        $filter: {
                            input: "$products",
                            as: "product",
                            cond: { $eq: ["$$product.code", productCode] },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products._id",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $project: {
                    name: 1,
                    products: {
                        $map: {
                            input: "$products",
                            as: "product",
                            in: {
                                $mergeObjects: [
                                    "$$product",
                                    {
                                        $first: {
                                            $filter: {
                                                input: "$productDetails",
                                                cond: { $eq: ["$$this._id", "$$product._id"] },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        ]);

        return res.status(200).send({ message: "Success", data: mRes[0]?.products[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/:id/buyProduct", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id: storageId } = req.params;
        const { productId, buyingPrice, amount } = req.body;

        const mRes = await StorageModel.find(
            {
                _id: storageId,
                products: { $elemMatch: { _id: productId } },
            },
            { "products.$": 1 }
        );

        if (!mRes[0]?.products) {
            const sellingPrice = buyingPrice + buyingPrice / 10;

            await StorageModel.findByIdAndUpdate(storageId, {
                $push: {
                    products: {
                        _id: productId,
                        buyingPrice,
                        sellingPrice,
                        totalAmount: amount,
                        buyingPriceHistory: [buyingPrice],
                        sellingPriceHistory: [sellingPrice],
                    },
                },
            });
        } else {
            await StorageModel.findOneAndUpdate(
                { _id: storageId, "products._id": productId },
                {
                    $inc: { "products.$.totalAmount": amount },
                    $set: { "products.$.buyingPrice": buyingPrice },
                    $push: { "products.$.buyingPriceHistory": buyingPrice },
                }
            );
        }

        await StorageModel.findByIdAndUpdate(storageId, {
            $push: { operationsHistory: { _id: productId, operationName: "buying", amount } },
        });

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/:id/sellProduct", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id: storageId } = req.params;
        const { productId, amount } = req.body;

        await StorageModel.findOneAndUpdate(
            { _id: storageId, "products._id": productId },
            {
                $inc: { "products.$.totalAmount": -amount },
                $set: { "products.$.sellingPrice": sellingPrice },
                $push: { "products.$.sellingPriceHistory": sellingPrice },
            }
        );

        await StorageModel.findByIdAndUpdate(storageId, {
            $push: { operationsHistory: { _id: productId, operationName: "selling", amount } },
        });

        return res.status(200).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/:id/deleteProduct", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id: storageId } = req.params;
        const { productId } = req.body;

        await StorageModel.findByIdAndUpdate(storageId, { $pull: { products: { _id: productId } } });
        await StorageModel.findByIdAndUpdate(storageId, {
            $push: { operationsHistory: { productId, operationName } },
        });

        return res.status(200).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/:id/changeProductSellingPrice", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id: storageId } = req.params;
        const { productId, newValue } = req.body;

        await StorageModel.findOneAndUpdate(
            { _id: storageId, "products._id": productId },
            { $set: { "products.$.sellingPrice": newValue } }
        );

        await StorageModel.findOneAndUpdate(
            { _id: storageId, "products._id": productId },
            { $push: { "products.$.sellingPriceHistory": newValue } }
        );

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/:id/changeProductTotalAmount", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id: storageId } = req.params;
        const { productId, newValue } = req.body;

        await StorageModel.findOneAndUpdate(
            { _id: storageId, "products._id": productId },
            { $set: { "products.$.totalAmount": newValue } }
        );

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/:id/getOperationsHistory", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await StorageModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "operationsHistory._id",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $project: {
                    name: 1,
                    operationsHistory: {
                        $map: {
                            input: "$operationsHistory",
                            as: "operation",
                            in: {
                                $mergeObjects: [
                                    "$$operation",
                                    {
                                        $first: {
                                            $filter: {
                                                input: "$productDetails",
                                                cond: { $eq: ["$$this._id", "$$operation._id"] },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        ]);

        return res.status(200).send({ message: "Success", data: mRes[0]?.operationsHistory });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/:id/clearOperationsHistory", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        await StorageModel.findByIdAndUpdate(id, { operationsHistory: [] });

        return res.status(201).send({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

module.exports = router;
