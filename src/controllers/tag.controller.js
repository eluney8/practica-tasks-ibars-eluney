import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";

export const crearEtiqueta = async (req, res) => {
  try {
    const { name, task_ids } = req.body;

    if (name === undefined || !name.trim()) {
      return res.status(400).json({
        message: "los campos no pueden estar vacios",
      });
    }

    const etiquetaExiste = await TagModel.findOne({ where: { name } });
    if (etiquetaExiste) {
      return res.status(400).json({
        message: "ya existe una etiqueta con ese nombre",
      });
    }
    const nuevaEtiqueta = await TagModel.create({ name });
    if (task_ids && Array.isArray(task_ids) && task_ids.length > 0) {
      const tareasExistentes = await TaskModel.findAll({
        where: { id: task_ids },
      });
      if (tareasExistentes.length !== task_ids.length) {
        return res.status(404).json({
          message: "la tarea debe existir",
        });
      }
      await nuevaEtiqueta.setTareas(tareasExistentes);
    }
    return res.status(201).json({
      message: "etiqueta creada",
      etiqueta: nuevaEtiqueta,
    });
  } catch (error) {
    console.error("Error en crearEtiqueta:", error);
    return res.status(500).json({
      message: "error interno del servidor",
    });
  }
};

export const obtenerEtiquetas = async (req, res) => {
  try {
    const etiquetas = await TagModel.findAll({
      include: [
        {
          model: TaskModel,
          as: "tareas",
          attributes: ["id", "title", "description", "is_completed"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.status(200).json(etiquetas);
  } catch (error) {
    console.error("error sl obtener las etiquetas", error);
    return res.status(500).json({
      message: "error interno del servidor",
    });
  }
};
