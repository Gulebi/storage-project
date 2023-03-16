const { StorageModel, ProductModel } = require("../Models");
const { Router } = require("express");

const router = Router();

router.post("/create", (req, res) => {
    try {
        res.set("Content-Type", "application/json");

        const { name } = req.body;

        StorageModel.create({ name }).then(
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

// router.post("/operation/:id", async (req, res) => {
//     try {
//         res.set("Content-Type", "application/json");

//         const { productId, operationName } = req.body;

//         if (operationName === "buying") {
//             await ProductModel.findByIdAndUpdate(productId, { $inc: { totalAmount: 1 } });
//         } else if (operationName === "selling") {
//             await ProductModel.findByIdAndUpdate(productId, { $inc: { totalAmount: -1 } });
//         }

//         StorageModel.findByIdAndUpdate(id, { $push: { operationsHistory: { productId, operationName } } }).then(
//             (doc) => {
//                 return res.status(200).send({ message: "Success", data: doc });
//             },
//             () => {
//                 return res.status(500).send({ message: "Error" });
//             }
//         );
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ message: "Error" });
//     }
// });

module.exports = router;
