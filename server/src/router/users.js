const { UserModel } = require("../Models.js");
const { Router } = require("express");
const { Types } = require("mongoose");

const router = Router();

router.get("/:id/info", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await UserModel.findById(id, { password: 0 });

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.put("/:id/addStorage", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;
        const { id: storageId, status } = req.body;

        const mRes = await UserModel.findByIdAndUpdate(id, { $push: { storages: { _id: storageId, status } } });

        return res.status(200).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.get("/:id/getStorages", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;

        const mRes = await UserModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "storages",
                    localField: "storages._id",
                    foreignField: "_id",
                    as: "storagesDetails",
                    pipeline: [
                        {
                            $project: {
                                products: 0,
                                totalMoneyHistory: 0,
                                operationsHistory: 0,
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    name: 1,
                    storages: {
                        $map: {
                            input: "$storages",
                            as: "storage",
                            in: {
                                $mergeObjects: [
                                    "$$storage",
                                    {
                                        $first: {
                                            $filter: {
                                                input: "$storagesDetails",
                                                cond: { $eq: ["$$this._id", "$$storage._id"] },
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

        return res.status(200).send({ message: "Success", data: mRes[0]?.storages });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

router.post("/:id/setInfo", async (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { id } = req.params;
        const { value, field } = req.body;

        const mRes = await UserModel.findByIdAndUpdate(id, { [field]: value });

        return res.status(201).send({ message: "Success", data: mRes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error" });
    }
});

module.exports = router;
