import { TagModel } from "../models/tag.model.js";
import { TaskModel } from "../models/task.model.js";
import { matchedData } from "express-validator";

export const crearEtiqueta = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const nuevaEtiqueta = await TagModel.create(validatedData);
    return res.status(201).json({
      message: "Etiqueta creada con éxito",
      tag: nuevaEtiqueta
    });
  } catch (error) {
    console.error("error en crearEtiqueta:", error);
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
