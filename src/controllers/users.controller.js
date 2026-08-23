import { UsersModel } from "../models/user.model.js";
import { TaskModel } from "../models/task.model.js"; 
import { param } from "express-validator";
// crear usuario
export const crearUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "los campos no pueden estar vacios" });
    }
    if (name.length > 100) {
      return res
        .status(400)
        .json({ message: "el nombre no puede superar los 100 caracteres" });
    }

    if (email.length > 100) {
      return res
        .status(400)
        .json({ message: "el gmail no puede syperar los 100 caracteres" });
    }
    if (password.length > 100) {
      return res
        .status(400)
        .json({ message: "la contraseña mo puede superar los 100 caracteres" });
    }
    const emailExistente = await UsersModel.findOne({ where: { email } });
    if (emailExistente) {
      return res.status(400).json({ message: "el gmail debe de ser unico" });
    }

    const user = await UsersModel.create(req.body);
    return res.status(201).json({
      message: "usuario creado con exito",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

// traer los usuarios
export const obtenerUser = async (req, res) => {
  try {
    const user = await UsersModel.findAll({
      attributes:{
        exclude:["password"]
      },
      include:[
        {
          model:TaskModel,
          as: "tareas"
        }
      ]
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// obtener un usuario por su id
export const obtenerUserPorId = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    // Buscamos en la base
    const userEncontrado = await UsersModel.findByPk(userId,{
      attributes:{
        exclude:["password"]
      },
      include: [
        {
          model:TaskModel,
          as:"tareas"
        }
      ]
    });
    if (!userEncontrado) {
      return res.status(404).json({
        message: `user con el id #${userId} no encontrado`,
      });
    }
    return res.json({
      message: "User encontrado",
      userEncontrado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
// editar personaje por id
export const editarUser = async (req, res) => {
  try {
    const idUser = Number(req.params.id);
    const { name, email, password } = req.body;
    // buscamos por id
    const user = await UsersModel.findByPk(idUser);
    if (!user) {
      return res.status(404).json({
        message: "usuario no encontrado",
      });
    }
    await user.update({
      name,
      email,
      password,
    });
    return res.status(200).json({
      message: "user editado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "error interno del servidor",
    });
  }
};

// eliminar un usuario por su id
export const eliminarUser = async (req, res) => {
  try {
    const idUsuario = Number(req.params.id);

    const usuario = await UsersModel.findByPk(idUsuario);
    if (!usuario) {
      return res.status(404).json({
        message: "usuario no encontrado",
      });
    }
    await usuario.destroy();
    return res.status(200).json({
      message: "usuario eliminado",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const userIdValidation = [
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