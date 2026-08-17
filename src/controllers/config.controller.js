import { ConfigModel } from "../models/config.model.js";
import { UsersModel } from "../models/user.model.js";

export const crearConfig = async (req, res) => {
  try {
    const { theme_color, language, user_id } = req.body;
    if (!user_id || !language || !theme_color) {
      return res.status(400).json({
        message: "los campos son obligatorio para la configuracion",
      });
    }
    const usuarioExiste = await UsersModel.findByPk(user_id);
    if (!usuarioExiste) {
      return res.status(404).json({
        message: "el usuario asignado no existe",
      });
    }
    const configExistente = await ConfigModel.findOne({ where: { user_id } });
    if (configExistente) {
      return res.status(400).json({
        message: "este usuario ya tiene una configuración registrada",
      });
    }
    const nuevaConfig = await ConfigModel.create({
      theme_color,
      language,
      user_id,
    });
    return res.status(201).json({
      message: "configuración guardada",
      nuevaConfig,
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