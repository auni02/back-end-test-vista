import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger";

const app = express();

app.use(cors());              // 1. add CORS headers to every response
app.use(express.json());      // 2. parse JSON bodies into req.body
app.use(logger);              // 3. log each request
app.disable("x-powered-by");  // 4. disable the X-Powered-By header

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
