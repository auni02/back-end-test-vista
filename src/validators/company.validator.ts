import { body } from "express-validator";

export const createCompanyRules = [
  body("name")
    .exists().withMessage("name is required")
    .bail()                                    // stop checking this field if the previous check failed
    .isString().withMessage("name must be a string")
    .trim()                                    // "  Acme  " → "Acme" (also changes req.body!)
    .notEmpty().withMessage("name must not be empty"),

  body("registrationNumber")
    .exists().withMessage("registrationNumber is required")
    .bail()
    .isString().withMessage("registrationNumber must be a string")
    .trim()
    .notEmpty().withMessage("registrationNumber must not be empty")
];
