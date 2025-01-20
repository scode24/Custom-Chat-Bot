import express from "express";
import { askQuery } from "../controllers/query.controller.js";

const appRouter = express.Router();

// Get all users
appRouter.post("/query", async (req, res, next) => {
  res.send(await askQuery(req, res, next));
});

export default appRouter;
