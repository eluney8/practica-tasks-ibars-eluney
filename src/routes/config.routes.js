import { Router } from "express";
import { crearConfig, obtenerConfig } from "../controllers/config.controller.js";
import { createConfigValidation } from "../middlewares/validations/config.validation.js";
import { validate } from "../middlewares/validate.js";

export const configRoutes = Router();

configRoutes.post("/config",createConfigValidation,validate, crearConfig);

configRoutes.get("/config", obtenerConfig);


