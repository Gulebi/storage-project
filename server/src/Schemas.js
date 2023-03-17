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
    description: String,
    category: String,
    manufacturer: String,
    manufacturerPrice: Number,
    creationDate: { type: Date, default: Date.now },
});

const StorageSchema = new Schema({
    name: String,
    adminId: String,
    creationDate: { type: Date, default: Date.now },
    totalMoney: { type: Number, default: 0 },
    totalMoneyHistory: { type: [Number], default: [0] },
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
    operationsHistory: {
        type: [
            {
                productId: String,
                operationName: { type: String, enum: ["buying", "selling", "deleting"] },
                operationDate: { type: Date, default: Date.now },
            },
        ],
        default: [],
    },
});

module.exports = { UserSchema, ProductSchema, StorageSchema };