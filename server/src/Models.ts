import { model } from "mongoose";
import { ProductSchema, UserSchema, StorageSchema } from "./Schemas";

const UserModel = model("users", UserSchema);
const ProductModel = model("products", ProductSchema);
const StorageModel = model("storages", StorageSchema);

export { UserModel, ProductModel, StorageModel };
