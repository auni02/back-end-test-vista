import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function validate(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.array().map((e) => ({
        field: e.type === "field" ? e.path : "unknown",
        message: e.msg,
      })),
    });
  }
  next();
}
