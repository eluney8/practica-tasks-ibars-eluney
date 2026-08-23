import { Router } from "express";
import { crearUser, editarUser, eliminarUser, obtenerUser, obtenerUserPorId } from "../controllers/users.controller.js";
import { createUserValidation, editarUserValidation, userIdValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.js";

export const usersRoutes = Router();

usersRoutes.post("/users",createUserValidation, validate, crearUser);
usersRoutes.get("/users", obtenerUser );
usersRoutes.get("/users/:id", editarUserValidation, validate, obtenerUserPorId);
usersRoutes.put("/users/:id",userIdValidation, validate, editarUser);
usersRoutes.delete("/users/:id",userIdValidation,validate,eliminarUser);