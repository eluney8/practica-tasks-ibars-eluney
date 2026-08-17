import { Router } from "express";
import { crearEtiqueta, obtenerEtiquetas } from "../controllers/tag.controller.js";

export const tagRoutes = Router();

tagRoutes.post("/tags", crearEtiqueta);
tagRoutes.get("/tags", obtenerEtiquetas);