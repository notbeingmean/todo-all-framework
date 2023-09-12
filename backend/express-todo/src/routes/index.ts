import express from "express";
import { todoRouter } from "./todo";

const router = express.Router();

router.use("/todos", todoRouter);

router.get("/healthcheck", (req, res) => {
  res.status(200).json({ message: "OK!" });
});

export { router as mainRouter };
