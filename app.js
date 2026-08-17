import express from 'express';
import { bdLista } from "./src/config/database.js"
import { usersRoutes } from './src/routes/users.routes.js';
import { UsersModel } from './src/models/user.model.js';
import { taskRoutes } from './src/routes/task.routes.js';
import { configRoutes } from './src/routes/config.routes.js';
const app = express();

app.use(express.json());

bdLista();
app.use("/api", usersRoutes, taskRoutes, configRoutes);

app.get("/", (req, res) =>{
    res.send("servidor express funcionando")
});

const PORT = 3001;
app.listen(PORT, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
});