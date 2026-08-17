import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TaskModel } from "./task.model.js";
import { TagModel } from "./tag.model.js";

export const TaskTagModel = sequelize.define(
  "Task_tag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  },
);

TaskModel.belongsToMany(TagModel, {
  through: TaskTagModel,
  foreignKey: "task_id",
  as: "etiquetas",
});
TagModel.belongsToMany(TaskModel, {
  through: TaskTagModel,
  foreignKey: "tag_id",
  as: "tareas",
});

