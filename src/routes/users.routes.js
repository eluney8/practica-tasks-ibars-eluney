import { Router } from "express";
import { crearUser, editarUser, eliminarUser, obtenerUser, obtenerUserPorId } from "../controllers/users.controller.js";
export const usersRoutes = Router();

usersRoutes.post("/users", crearUser);
usersRoutes.get("/users", obtenerUser );
usersRoutes.get("/users/:id",obtenerUserPorId);
usersRoutes.put("/users/:id",editarUser);
usersRoutes.delete("/users/:id",eliminarUser);