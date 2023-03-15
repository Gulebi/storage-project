const { model } = require("mongoose");
const { ProductSchema, UserSchema, StorageSchema } = require("./Schemas");

const UserModel = model("users", UserSchema);
const ProductModel = model("products", ProductSchema);
const StorageModel = model("storages", StorageSchema);

module.exports = { UserModel, ProductModel, StorageModel };
