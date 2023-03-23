import express, { json } from "express";
import productoSchema from "../model/models/producto.js";

const homeRouter = express.Router();

homeRouter.get("/", async (req,res) => {
    try {
        const productos =await productoSchema.find();
        res.render("home", {products: productos.map(producto => producto.toJSON()), jsFile: "home.js" })
        //Daba error: codigo de https://github.com/handlebars-lang/handlebars.js/issues/1642
    } catch (error) {
        console.log("Hubo un error al intentar obtener los productos: ", error)
    }
});

export default homeRouter;