import { Router } from "express";
import { crearConfig, obtenerConfig } from "../controllers/config.controller.js";

export const configRoutes = Router();

configRoutes.post("/config", crearConfig);

configRoutes.get("/config", obtenerConfig);


