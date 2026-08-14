import { Router } from "express";
import { añadirTarea, editarTarea, obtenerTareas, obtenerTaskPorId } from "../controllers/task.controller.js";

export const taskRoutes = Router();

taskRoutes.post("/task", añadirTarea);
taskRoutes.get("/task", obtenerTareas );
taskRoutes.get("/task/:id",obtenerTaskPorId);
taskRoutes.put("/task/:id",editarTarea);
// taskRoutes.delete("/task/:id",eliminarUser);