import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { initConfig } from "./configurations/ai.config.js";
import errorHandler from "./error_handlers/app.error.handler.js";
import appRouter from "./routers/app.router.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(appRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  initConfig(() => {
    console.log("LLM configuration initialized");
  });
  console.log(`Server running on port ${PORT}`);
});
