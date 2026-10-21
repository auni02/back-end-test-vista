import { body, param } from "express-validator";

export const createServiceRules = [
  body("name")
    .exists().withMessage("name is required")
    .bail()
    .isString().withMessage("name must be a string")
    .trim()
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
    // max ikut DECIMAL(10,2) dalam schema, lebih dari ni DB tak muat
    .isFloat({ gt: 0, max: 99999999.99 }).withMessage("price must be a positive number up to 99999999.99")
    .toFloat(), // "150.50" (string) jadi 150.5 (number), so controller dapat number betul

  body("companyId")
    .exists().withMessage("companyId is required")
    .bail()
    .isInt({ min: 1 }).withMessage("companyId must be a positive integer")
    .toInt(),
];

export const getServiceByIdRules = [
  param("id")
    .isInt({ min: 1 }).withMessage("id must be a positive integer")
    .toInt(),
];
