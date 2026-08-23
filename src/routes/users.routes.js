import { Router } from "express";
import { crearUser, editarUser, eliminarUser, obtenerUser, obtenerUserPorId } from "../controllers/users.controller.js";
import { createUserValidation, editarUserValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";

export const usersRoutes = Router();

usersRoutes.post("/users",createUserValidation, validate, crearUser);
usersRoutes.get("/users", obtenerUser );
usersRoutes.get("/users/:id",obtenerUserPorId);
usersRoutes.put("/users/:id",editarUserValidation, validate, editarUser);
usersRoutes.delete("/users/:id",eliminarUser);