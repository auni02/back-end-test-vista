import { Router } from "express";
import { createCompany, getCompanies } from "../controllers/company.controller";
import { createCompanyRules } from "../validators/company.validator";
import { validate } from "../middleware/validate";

const router = Router();

router.post("/", createCompanyRules, validate, createCompany);   // rules → check → handler
router.get("/", getCompanies);

export default router;
