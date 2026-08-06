import express from 'express';

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("servidor express funcionando")
})

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
})