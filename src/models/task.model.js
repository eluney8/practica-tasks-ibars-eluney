import { DataTypes} from "sequelize";
import { sequelize } from "../config/database";

 export const task = sequelize.define(
    "task",
    {
        id: { 
            type: DataTypes.INTEGER,  
            primaryKey: true,
            autoIncrement: true
    },
        title: {
            type: String(100),
            unique: true,
            allowNull: false
        },
        description: {
            type: String(100),
            allowNull: false
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
);
