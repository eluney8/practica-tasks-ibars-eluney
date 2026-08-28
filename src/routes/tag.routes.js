import { Router } from "express";
import { crearEtiqueta, obtenerEtiquetas } from "../controllers/tag.controller.js";
import { createTagValidation } from "../middlewares/validations/tag.validation.js";
import { validate } from "../middlewares/validate.js";

export const tagRoutes = Router();

tagRoutes.post("/tags",createTagValidation, validate,crearEtiqueta);
tagRoutes.get("/tags", obtenerEtiquetas);
