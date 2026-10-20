import { body, param } from "express-validator";

export const createServiceRules = [
  body("name")
    .exists().withMessage("name is required")
    .bail()                                    // stop checking this field if the previous check failed
    .isString().withMessage("name must be a string")
    .trim()                                    // "  Acme  " → "Acme" (also changes req.body!)
    .notEmpty().withMessage("name must not be empty"),

  body("description")
    .exists().withMessage("description is required")
    .bail()
    .isString().withMessage("description must be a string")
    .trim()
    .notEmpty().withMessage("description must not be empty"),

  body("price")
    .exists().withMessage("price is required")
    .bail()
    .isFloat({ gt: 0, max: 99999999.99 }).withMessage("price must be a positive number up to 99999999.99")
    .toFloat(),                                // "150.50" → 150.5 (number)

  body("companyId")
    .exists().withMessage("companyId is required")
    .bail()
    .isInt({ min: 1 }).withMessage("companyId must be a positive integer")
    .toInt(),                                  // "1" → 1 (number)
];

export const getServiceByIdRules = [
  param("id")
    .isInt({ min: 1 }).withMessage("id must be a positive integer")
    .toInt(),
];
