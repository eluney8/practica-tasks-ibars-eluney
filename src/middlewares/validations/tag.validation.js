import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const tagIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id de la etiqueta debe ser un numero entero y positivo"),
];

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("el nombre de la etiqueta es obligatorio")
    .isLength({ max: 100 })
    .withMessage("el nombre de la etiqueta no puede superar los 100 caracteres")
    .custom(async (value) => {
      const etiquetaExiste = await TagModel.findOne({ where: { name: value } });
      if (etiquetaExiste) {
        throw new Error("ya existe una etiqueta con ese nombre");
      }
      return true;
    }),
];
