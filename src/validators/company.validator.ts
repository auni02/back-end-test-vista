import { body } from "express-validator";

export const createCompanyRules = [
  body("name")
    .exists().withMessage("name is required")
    .bail() // check atas fail? stop terus, tak payah spam 3 error untuk 1 masalah
    .isString().withMessage("name must be a string")
    .trim() // ni ubah req.body sekali tau. "   " jadi "", so notEmpty bawah tu fail
    .notEmpty().withMessage("name must not be empty"),

  body("registrationNumber")
    .exists().withMessage("registrationNumber is required")
    .bail()
    .isString().withMessage("registrationNumber must be a string")
    .trim()
    .notEmpty().withMessage("registrationNumber must not be empty")
];
