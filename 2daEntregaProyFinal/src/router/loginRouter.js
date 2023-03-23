import express from "express";
import usuarioSchema from "../model/models/usuario.js"

const loginRouter = express.Router();

loginRouter.get("/login", (req,res) => {
    res.render("login", { title: "Login", jsFile: "login.js" });
});

//Crear sesion al hacer el login, manejar el error dinamicamente, hacerlo en logs
loginRouter.post("/login", async (req,res) => {
        const user = await usuarioSchema.findOne({ name: req.body.userLogin, password: req.body.passLogin});
        if (user){
            res.render("message", {message: "Login Exitoso!", status: 400});
        }else{
            res.render("message", {message: "Error de login!", status: 200});
        }
})

export default loginRouter;