import { UsersModel } from "../models/user.model.js";

// crear usuario
export const crearUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(name);
        if (!name || !email || !password ) {
            return res.status(400).json({message:"los campos no pueden estar vacios"});
        };
        if (name.length > 100){
            return res.status(400).json({message:"el nombre no puede superar los 100 caracteres"})
        };
   
        if (email.length > 100) {
            return res.status(400).json({message:"el gmail no puede syperar los 100 caracteres"})
        }
        if (password.length > 100) {
            return res.status(400).json({message:"la contraseña mo puede superar los 100 caracteres"})
        }
             const emailExistente = await UsersModel.findOne({ where: { email } });
        if (emailExistente) {
            return res.status(400).json({message:"el gmail debe de ser unico"})
        };

        const user = await UsersModel.create(req.body);
        return res.status(201).json({
            message:"usuario creado con exito", user
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"error interno del servidor"})
    }
};
