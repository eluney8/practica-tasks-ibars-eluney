import { Router } from "express";
import { crearUser } from "../controllers/users.controller.js";
export const usersRoutes = Router();

usersRoutes.post("/users", crearUser);