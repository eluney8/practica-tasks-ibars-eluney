import { TaskModel } from "../models/task.model.js";

export const añadirTarea = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;
    console.log(title);

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "los campos no pueden estar vacios" });
    }
    if (title.length > 100) {
      return res
        .status(400)
        .json({ message: "el titulo no puede superar los 100 caracteres" });
    }

    if (description.length > 100) {
      return res
        .status(400)
        .json({
          message: "la descripcion no puede superar los 100 caracteres",
        });
    }
    const titleExistente = await TaskModel.findOne({ where: { title } });
    if (titleExistente) {
      return res.status(400).json({ message: "la tarea debe de ser unica" });
    }

    if (isComplete !== undefined && typeof isComplete !== "boolean") {
      return res.status(400).json({
        message: "isComplete debe ser un valor booleano",
      });
    }

    const task = await TaskModel.create(req.body);
    return res.status(201).json({
      message: "tarea creada con exito",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
