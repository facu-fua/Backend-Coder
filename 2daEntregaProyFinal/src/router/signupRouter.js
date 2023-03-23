import express from "express";
import usuarioSchema from "../model/models/usuario.js"

const signupRouter = express.Router();

signupRouter.get("/signup", (req,res) => {
    res.render("signup", { title: "Signup", jsFile: "signup.js"  })
});

signupRouter.post("/signup", async (req,res) =>{
    let user = {
        name: req.body.name,
        homeAdress: req.body.address,
        age: req.body.age,
        email: req.body.email,
        phoneNumber: req.body.phone,
        password: req.body.password
    }
    try {
        const existingUser = await usuarioSchema.findOne({email: req.body.email})
        if (existingUser){
            res.render("message", {message: "Usuario ya existe!"});
        }else{
            const data = await usuarioSchema(user).save();
            console.log("Usuario agregado con exito ", data)
            res.render("message", {message: "Registro Exitoso!", status: 400});
        }
    } catch (error) {
        console.log("Hubo un error ", error);
    }
})

export default signupRouter;