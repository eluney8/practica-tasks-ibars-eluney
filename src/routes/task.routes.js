import { Router } from "express";
import { añadirTarea } from "../controllers/task.controller.js";

export const taskRoutes = Router();

taskRoutes.post("/task", añadirTarea);
// taskRoutes.get("/task", obtenerUser );
// taskRoutes.get("/task/:id",obtenerUserPorId);
// taskRoutes.put("/task/:id",editarUser);
// taskRoutes.delete("/task/:id",eliminarUser);