import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UsersModel } from "./user.model.js";

export const ConfigModel = sequelize.define("Config", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  theme_color: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: "azul",
  },
  language: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "es",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "Users",
      key: "id",
    },
  },
}, {
  timestamps: false,
});

ConfigModel.belongsTo(UsersModel, { foreignKey: "user_id", as: "usuario" });
UsersModel.hasOne(ConfigModel, {foreignKey: "user_id", as: "config" });
