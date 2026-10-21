import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction // tak guna pun, tapi WAJIB ada. Express kenal error handler sebab dia ada 4 params
) {
  // JSON rosak dari express.json() → salah client, so 400
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }

  // Lain-lain salah kita. Log penuh kat server je, client dapat mesej vague (jangan bocor info dalaman)
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
}
