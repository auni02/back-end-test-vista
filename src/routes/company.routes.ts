import { Router } from "express";
import { createCompany, getCompanies } from "../controllers/company.controller";
import { createCompanyRules } from "../validators/company.validator";
import { validate } from "../middleware/validate";

const router = Router();

// rules → validate → controller. Input salah, stop kat validate (400), tak sampai DB pun
router.post("/", createCompanyRules, validate, createCompany);
router.get("/", getCompanies);

export default router;
