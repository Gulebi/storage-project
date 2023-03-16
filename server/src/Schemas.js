const { Schema } = require("mongoose");

const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    storages: {
        type: [
            {
                storageId: String,
                status: { type: String, enum: ["admin", "user"] },
            },
        ],
        default: [],
    },
});

const ProductSchema = new Schema({
    name: String,
    producer: String,
});

const StorageSchema = new Schema({
    name: String,
    totalMoney: { type: Number, default: 0 },
    products: {
        type: [
            {
                productId: String,
                buyingPrice: Number,
                buyingPriceHistory: { type: [Number], default: [] },
                sellingPrice: Number,
                sellingPriceHistory: { type: [Number], default: [] },
                totalAmount: { type: Number, default: 0 },
            },
        ],
        default: [],
    },
    totalMoneyHistory: { type: [Number], default: [] },
    operationsHistory: {
        type: [
            {
                productId: String,
                operationName: { type: String, enum: ["buying", "selling", "deleting"] },
            },
        ],
        default: [],
    },
});

module.exports = { UserSchema, ProductSchema, StorageSchema };
