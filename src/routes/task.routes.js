import { Router } from "express";
import { añadirTarea, editarTarea, eliminarTask, obtenerTareas, obtenerTaskPorId } from "../controllers/task.controller.js";
import { createTaskValidation, taskIdValidation } from "../middlewares/validations/task.validation.js";
import { validate } from "../middlewares/validate.js";

export const taskRoutes = Router();

taskRoutes.post("/task",createTaskValidation,validate, añadirTarea);
taskRoutes.get("/task", obtenerTareas );
taskRoutes.get("/task/:id",taskIdValidation,validate,obtenerTaskPorId);
taskRoutes.put("/task/:id",editarTarea);
taskRoutes.delete("/task/:id",taskIdValidation,validate, eliminarTask);