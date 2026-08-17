import express from 'express';
import { bdLista } from "./src/config/database.js"
import { usersRoutes } from './src/routes/users.routes.js';
import { UsersModel } from './src/models/user.model.js';
import { taskRoutes } from './src/routes/task.routes.js';
import { configRoutes } from './src/routes/config.routes.js';
import { tagRoutes } from './src/routes/tag.routes.js';
import { TaskTagModel } from './src/models/task_tag.model.js';
const app = express();

app.use(express.json());


app.use("/api", usersRoutes, taskRoutes, configRoutes, tagRoutes);
bdLista();
app.get("/", (req, res) =>{
    res.send("servidor express funcionando")
});

const PORT = 3001;
app.listen(PORT, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
});