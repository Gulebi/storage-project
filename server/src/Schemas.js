const { Schema } = require("mongoose");
const { uid } = require("./utils");

const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    imageURL: String,
    storages: {
        type: [
            {
                status: { type: String, enum: ["admin", "user"] },
            },
        ],
        default: [],
    },
});

const ProductSchema = new Schema({
    name: String,
    image: String,
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
    totalMoneyHistory: {
        type: [
            {
                value: Number,
                date: { type: Date, default: Date.now },
            },
        ],
        default: [],
    },
    products: {
        type: [
            {
                code: { type: String, default: () => uid() },
                buyingPrice: Number,
                buyingPriceHistory: { type: [Number], default: [] },
                sellingPrice: Number,
                sellingPriceHistory: { type: [Number], default: [] },
                totalAmount: Number,
            },
        ],
        default: [],
    },
    operationsHistory: {
        type: [
            {
                operationName: { type: String, enum: ["buying", "selling", "deleting"] },
                amount: Number,
                operationDate: { type: Date, default: Date.now },
            },
        ],
        default: [],
    },
});

module.exports = { UserSchema, ProductSchema, StorageSchema };
