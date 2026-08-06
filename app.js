import express from 'express';
import { bdLista } from "./src/config/database.js"
const app = express();

app.use(express.json());

bdLista();

app.get("/", (req, res) =>{
    res.send("servidor express funcionando")
})

app.use("/", (req, res) => {
return res.json({ message: "servidor todo listo" });
 });

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
})