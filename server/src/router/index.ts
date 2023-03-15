import { Router, static as expressStatic } from "express";
import authRouter from "./auth";
import productsRouter from "./products";
import usersRouter from "./users";

const router = Router();

router.use("/static", expressStatic(__dirname + "/public"));

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

export default router;
