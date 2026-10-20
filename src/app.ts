import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger";
import companyRoutes from "./routes/company.routes";
import serviceRoutes from "./routes/service.routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

app.disable("x-powered-by");  // hide the X-Powered-By header

app.use(cors());              // 1. add CORS headers to every response
app.use(logger);              // 3. log each request (must run before the routes)
app.use(express.json());      // 2. parse JSON bodies into req.body

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/companies", companyRoutes);
app.use("/services", serviceRoutes);
app.use(notFound);            
app.use(errorHandler);       

export default app;
