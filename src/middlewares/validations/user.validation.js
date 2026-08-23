import { body, param } from "express-validator";
import { UsersModel } from "../../models/user.model.js";

export const createUserValidation = [
  body("name")
    .notEmpty()
    .withMessage("el name no debe ser vacio")
    .isLength({ max: 100 })
    .withMessage("el nombre no puede superar los 100 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("el email debe ser valido")
    .isLength({ max: 100 })
    .withMessage("el email no puede superar los 100 caracteres")
    .custom(async (value) => {
      const emailExistente = await UsersModel.findOne({
        where: { email: value },
      });
      if (emailExistente) {
        throw new Error("el email ya se encuentra registrado");
      }
      return true;
    }),

  body("password")
    .notEmpty.withMessage("la contraseña mo debe ser vacia")
    .isLength({ max: 100 })
    .withMessage("la contraseña mo puede superar los 100 caracteres"),
];

export const editarUserValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id debe de se un numero entero y positivo")
    .custom(async (value) => {
      const usuarioExiste = await UsersModel.findByPk(value);
      if (!usuarioExiste) {
        throw new Error("el usuario no existe en el sistema");
      }
      return true;
    }),

  body("name")
    .optional()
    .notEmpty()
    .withMessage("el nombre no puede estar vacio")
    .isLength({ max: 100 })
    .withMessage("el nombre no puede superar los 100 caracteres"),

  body(email)
    .optional()
    .notEmpty()
    .withMessage("el email no puede estar vacio")
    .isEmail()
    .withMessage("el email debe de ser valido")
    .isLength({ max: 100 })
    .withMessage("el email no puede superar los 100 caracteres")
    .custom(async (value, { req }) => {
      const emailExistente = await UsersModel.findOne({
        where: { email: value },
      });
      if (emailExistente && emailExistente.id !== Number(req.params.id)) {
        throw new Error("el email ya se encuentra resgistrado");
      }
      return true;
    }),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("la contraseña no puede estar vacia")
    .isLength({ max: 100 })
    .withMessage("la contraseña no pued esuperar ñps 100 caracteres"),
];

export const userIdValidation = [
  param("id")
  .isInt({min: 1})
  .withMessage("el id debe ser un numero entero y positivo")
  .custom(async(value) =>{
    const usuarioExiste = await UsersModel.findByPk(value);
    if (!usuarioExiste) {
      throw new Error ("el usuario con ese id no existe")
    }
    return true;
  })
]