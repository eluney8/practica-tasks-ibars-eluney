import { body, param } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { UsersModel } from "../../models/user.model.js";

export const createTaskValidation = [
  body("title")
  .trim()
    .notEmpty()
    .withMessage("el titulo de la tarea es obligatorio")
    .isLength({ max: 100 })
    .withMessage("el titulo no puede superar los 100 caracteres")
    .custom(async (value) => {
      const tareaExiste = await TaskModel.findOne({ where: { title: value } });
      if (tareaExiste) {
        throw new Error("ya existe una tarea con ese titulo");
      }
      return true;
    }),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("la descripcion de la tarea es obligatoria")
    .isLength({ max: 100 })
    .withMessage("la descripcion no puede superar los 100 caracteres"),

  body("is_completed")
    .optional()
    .isBoolean()
    .withMessage("is completed debe de ser un valor booleano"),

  body("user_id")
    .isInt({ min: 1 })
    .withMessage("el user_id debe ser un numero entero y positivo")
,
];

export const taskIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id de la tarea debe ser un numero entero y positivo")
];

export const editarTaskValidation = [
  //    para reutilizar el codigo
  ...taskIdValidation,

  body("title")
  .trim()
    .optional()
    .notEmpty()
    .withMessage("el titulo no puede estar vacio")
    .isLength({ max: 100 })
    .withMessage("el titulo no puede superar los 100 caracteres")
    .custom(async (value, { req }) => {
      const tareaExiste = await TaskModel.findOne({ where: { title: value } });
      if (tareaExiste && tareaExiste.id !== Number(req.params.id)) {
        throw new Error("el titulo ya está usado en otra tarea");
      }
      return true;
    }),
  body("description")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("la descripcion no puede estar vacia")
    .isLength({ max: 100 })
    .withMessage("la descripcion no puede superar los 100 caracteres"),
  body("is_completed")
    .optional()
    .isBoolean()
    .withMessage("el estado is Completed debe ser un valor booleano"),
];
