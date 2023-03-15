const { Schema } = require("mongoose");

const UserSchema = new Schema({
    name: String,
    surname: String,
    login: String,
    password: String,
    storages: [
        {
            storageId: String,
            status: { type: String, enum: ["admin", "user"] },
        },
    ],
});

const ProductSchema = new Schema({
    name: String,
    buyingPrice: Number,
    buyingPriceHistory: [Number],
    sellingPrice: Number,
    sellingPriceHistory: [Number],
    totalAmount: { type: Number, default: 0 },
    storageId: String,
});

const StorageSchema = new Schema({
    productsAmount: { type: Number, default: 0 },
    totalMoney: { type: Number, default: 0 },
    totalMoneyHistory: [Number],
    operationsHistory: [
        {
            productId: String,
            operationName: { type: String, enum: ["buying", "selling", "deleting"] },
        },
    ],
});

module.exports = { UserSchema, ProductSchema, StorageSchema };
