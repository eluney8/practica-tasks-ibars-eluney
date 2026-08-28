import { body } from "express-validator";
import { ConfigModel } from "../../models/config.model.js";
import { UsersModel } from "../../models/user.model.js";

export const createConfigValidation = [
  body("user_id")
    .notEmpty()
    .withMessage("el user_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("el user_id debe ser un numero entero y positivo"),
body("theme_color")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("el color del tema no puede estar vacio si se envia")
    .isLength({ max: 30 })
    .withMessage("el color del tema no puede superar los 30 caracteres"),

  body("language")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("el idioma no puede estar vacio si se envia")
    .isLength({ max: 20 })
    .withMessage("el idioma no puede superar los 20 caracteres")

];
