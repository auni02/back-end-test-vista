import express from "express";
import cors from "cors";
import { logger } from "./middleware/logger";
import companyRoutes from "./routes/company.routes";
import serviceRoutes from "./routes/service.routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

app.disable("x-powered-by");

// Order penting gila: Express run ikut turutan. json() kena sebelum routes, kalau tak req.body kosong
app.use(cors());
app.use(logger);
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/companies", companyRoutes);
app.use("/services", serviceRoutes);

// Dua ni MESTI paling last. Takde route match → notFound, ada error → errorHandler
app.use(notFound);
app.use(errorHandler);

export default app;
