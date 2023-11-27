import express from "express";
import usersRouter from "./users.js";
import booksRouter from "./books.js";
import purchasesRouter from "./purchases.js";
// import roleRouter from "./role.js"


const router = express.Router();

// Routes for different resources
router.use("/users", usersRouter);
router.use("/books", booksRouter);
router.use("/purchases", purchasesRouter);
// router.use("/roles", roleRouter);

export default router;