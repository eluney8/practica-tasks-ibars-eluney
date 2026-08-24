import { body } from "express-validator";
import { ConfigModel } from "../../models/config.model.js";
import { UsersModel } from "../../models/user.model.js";

export const createConfigValidation = [
  body("user_id")
    .notEmpty()
    .withMessage("el user_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("el user_id debe ser un numero entero y positivo")
    .custom(async (value) => {
      const usuarioExiste = await UsersModel.findByPk(value);
      if (!usuarioExiste) {
        throw new Error("ese usuario no existe");
      }
      const configExistente = await ConfigModel.findOne({
        where: { user_id: value },
      });
      if (configExistente) {
        throw new Error("este usuario ya tiene una configuración asignada");
      }
      return true;
    }),
];
