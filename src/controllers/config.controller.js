import { ConfigModel } from "../models/config.model.js";
import { UsersModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const crearConfig = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const usuarioExiste = await UsersModel.findByPk(validatedData.user_id);
    if (!usuarioExiste) {
      return res.status(404).json({
        message: "el usuario asignado no existe en el sistema"
      });
    }
    const configExistente = await ConfigModel.findOne({
      where: { user_id: validatedData.user_id }
    });
    if (configExistente) {
      return res.status(400).json({
        message: "este usuario ya tiene una configuracion asignada"
      });
    }
    const nuevaConfig = await ConfigModel.create(validatedData);
    return res.status(201).json({
      message: "configuración creada correctamente",
      config: nuevaConfig
    });
  } catch (error) {
    console.error("error en crear la config", error);
    return res.status(500).json({
      message: "error interno del servidor",
    });
  }
};

export const obtenerConfig = async (req, res) => {
  try {
    const configuraciones = await ConfigModel.findAll({
      include: [
        {
          model: UsersModel,
          as: "usuario",
          attributes: ["id", "name", "email"]
        }
      ]
    });
    return res.status(200).json(configuraciones);
  } catch (error) {
    console.error("error en obyener las configuraciones");
    return res.status(500).json({ 
      message: "error interno del servidor" 
    });
  }
};