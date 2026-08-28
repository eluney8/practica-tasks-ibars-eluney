import { Sequelize } from "sequelize";

export const sequelize = new Sequelize ("tasks_users_db", "root","",{
    host: "localhost",
    dialect: "mysql", 
})

export const bdLista = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Conexion a la bd correcta");
    } catch (error) {
    console.log("error al conectarse a la bd", error);
}
}