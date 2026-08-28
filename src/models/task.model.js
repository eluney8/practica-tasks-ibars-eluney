import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UsersModel } from "./user.model.js";

export const TaskModel = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
}, {
  timestamps: true,
  paranoid: true, 
});


TaskModel.belongsTo(UsersModel, { foreignKey: "user_id", as: "autor" });

UsersModel.hasMany(TaskModel, { foreignKey: "user_id", as: "tareas" });
