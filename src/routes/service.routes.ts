import { Router } from "express";
import { createService, getServiceById } from "../controllers/service.controller";
import { createServiceRules, getServiceByIdRules } from "../validators/service.validator";
import { validate } from "../middleware/validate";

const router = Router();

router.post("/", createServiceRules, validate, createService);       // rules → check → handler
router.get("/:id", getServiceByIdRules, validate, getServiceById);

export default router;
