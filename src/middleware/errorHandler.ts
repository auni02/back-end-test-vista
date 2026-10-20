import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction          // unused, but MUST be declared (4 params!)
) {
  // Case 1: invalid JSON body.
  // express.json() throws an error with type "entity.parse.failed".
  // It's the CLIENT's fault, so which status code?
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }

  // Case 2: anything else is OUR fault.
  console.error(err);         // log the full error on the SERVER, for you to debug
  res.status(500).json({ message: "Internal server error" });   // vague for the CLIENT
}
