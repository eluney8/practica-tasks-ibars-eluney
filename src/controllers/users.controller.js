import { UsersModel } from "../models/user.model.js";
import { TaskModel } from "../models/task.model.js";
import { matchedData } from "express-validator";

// crear usuario
export const crearUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      !name ||
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !email ||
      !password
    ) {
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
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: TaskModel,
          as: "tareas",
        },
      ],
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
    const { id } = matchedData(req, { locations: ["params"] });
    const usuario = await UsersModel.findByPk(id, {
      include: [
        {
          model: TaskModel,
          as: "tareas",
          attributes: ["id", "title", "description", "is_completed"],
        },
      ],
    });
    if (!usuario) {
      return res.status(404).json({
        message: "usuario no encontrado",
      });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
// editar user por id
export const editarUser = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });
    const user = await UsersModel.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "usuario no encontrado",
      });
    }
    await user.update(validatedDataBody);
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
    const { id } = matchedData(req, { locations: ["params"] });
    const user = await UsersModel.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "usuario no encontrado",
      });
    }
    await user.destroy();
    return res.status(200).json({
      message: "usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
