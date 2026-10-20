import { Request, Response } from "express";

export function notFound(req: Request, res: Response) {
  // ✍️ respond 404 with JSON like:
  // { "message": "Route GET /nothing-here not found" }
  // hint: req.method, req.originalUrl
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
}
