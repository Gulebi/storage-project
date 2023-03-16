const { Router, static: expressStatic } = require("express");
const authRouter = require("./auth");
const productsRouter = require("./products");
const usersRouter = require("./users");
const storagesRouter = require("./storages");

const router = Router();

router.use("/static", expressStatic(__dirname + "/public"));

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/storages", storagesRouter);

module.exports = router;
