import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString();         // "2026-10-20T13:44:01.123Z", standard UTC format
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();                                             // pass the request on to the next middleware or route
}
