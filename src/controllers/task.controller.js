import { TaskModel } from "../models/task.model.js";
import { taskRoutes } from "../routes/task.routes.js";
import { UsersModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const añadirTarea = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const usuarioExiste = await UsersModel.findByPk(validatedData.user_id);
    if (!usuarioExiste) {
      return res.status(404).json({
        message: "El usuario asignado no existe en el sistema",
      });
    }
    const nuevaTarea = await TaskModel.create(validatedData);
    return res.status(201).json({
      message: "Tarea creada con éxito",
      task: nuevaTarea,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const obtenerTareas = async (req, res) => {
  try {
    const task = await TaskModel.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: UsersModel,
          as: "autor",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const obtenerTaskPorId = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });
    const tarea = await TaskModel.findByPk(id);
    if (!tarea) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }
    await tarea.update(validatedDataBody);
    return res.status(200).json({
      message: "Tarea editada correctamente",
      task: tarea,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const editarTarea = async (req, res) => {
  try {
    const validatedDataBody = matchedData(req, { locations: ["body"] });
    const { id } = matchedData(req, { locations: ["params"] });
    const task = await TaskModel.findByPk(id);
    if (!task) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }
    await task.update(validatedDataBody);
    return res.status(200).json({
      message: "Tarea editada correctamente",
      task,
    });
  } catch (error) {
    console.error("error al actualizar la tarea:");
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const eliminarTask = async (req, res) => {
  try {
    const idTask = Number(req.params.id);

    const task = await TaskModel.findByPk(idTask);
    if (!task) {
      return res.status(404).json({
        message: "tarea no encontrado",
      });
    }
    await task.destroy();
    return res.status(200).json({
      message: "tarea eliminado",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "error interno del servidor",
    });
  }
};
