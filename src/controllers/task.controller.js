import { TaskModel } from "../models/task.model.js";
import { taskRoutes } from "../routes/task.routes.js";
import { UsersModel } from "../models/user.model.js";

export const añadirTarea = async (req, res) => {
  try {
    const { title, description, is_completed, user_id} = req.body;
    console.log(req.body);

    if (!title || !description || !user_id) {
      return res
        .status(400)
        .json({ message: "los campos no pueden estar vacios" });
    };
    if (title.length > 100) {
      return res
        .status(400)
        .json({ message: "el titulo no puede superar los 100 caracteres" });
    };

    if (description.length > 100) {
      return res.status(400).json({
        message: "la descripcion no puede superar los 100 caracteres",
      });
    };
    const titleExistente = await TaskModel.findOne({ where: { title } });
    if (titleExistente) {
      return res.status(400).json({ message: "la tarea debe de ser unica" });
    };

    if (is_completed !== undefined && typeof is_completed !== "boolean") {
      return res.status(400).json({
        message: "is_Complete debe ser un valor booleano",
      });
    };
    const usuarioExiste = await UsersModel.findByPk(user_id);
    if (!usuarioExiste) {
      return res.status(404).json({
        message:"el usuario asignado no existe"
      })
    };


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

export const obtenerTareas = async (req, res) => {
  try {
    const task = await TaskModel.findAll({
      attributes: {
        exclude: ["user_id"]
      },
      include: [
        {
          model:UsersModel,
          as:"autor",
          attributes:{
            exclude:["password"]
          }
        }
      ]
    });

    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const obtenerTaskPorId = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    // Buscamos en la bd
    const taskEncontrado = await TaskModel.findByPk(taskId);
    if (!taskEncontrado) {
      return res.status(404).json({
        message: `tarea con el id #${taskId} no encontrada`,
      });
    }
    return res.json({
      message: "tarea encontrada",
      taskEncontrado,
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
    const idTarea = Number(req.params.id);
    const { title, description, is_completed } = req.body;
    const tarea = await TaskModel.findByPk(idTarea);
    if (!tarea) {
      return res.status(404).json({ message: "tarea no encontrada" });
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res
          .status(400)
          .json({ message: "el titulo no puede estar vacio" });
      }
      if (title.length > 100) {
        return res
          .status(400)
          .json({ message: "el titulo no puede superar los 100 caracteres" });
      }
    }
    if (description !== undefined) {
      if (!description.trim()) {
        return res
          .status(400)
          .json({ message: "la descripcion no puede estar vacia" });
      }
      if (description.length > 100) {
        return res
          .status(400)
          .json({
            message: "la descripcion no puede superar los 100 caracteres",
          });
      }
    }
    if (is_completed !== undefined && typeof is_completed !== "boolean") {
      return res.status(400).json({
        message: "is_Complete debe ser un valor booleano",
      });
    }
    await tarea.update({
      title,
      description,
      is_completed,
    });
    return res.status(200).json({
      message: "tarea actualizada",
      task: tarea,
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
