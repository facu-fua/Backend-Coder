import express from "express";
import carritoSchema from "../model/carrito.js";

const routerCarritos = express.Router();

//CRUD CON MONGODB
routerCarritos.post("/carritos", async (res,req) => {
    const carrito = carritoSchema(req.body);
    try {
        const data = await carrito.save();
        console.log("Carrito agregado con exito ", data)
        res.json(data)
    } catch (error) {
        console.log("Hubo un error ", error);
    }
});

routerCarritos.put("/carritos", async (res,req) => {
    try {
        const id = req.params;
        const {timeStamp, cartProducts} = req.body;
        const carrito = await carritoSchema.updateOne({_id: id}, { $set: {timeStamp, cartProducts}});
        res.send("Carrito actualizado: ", carrito)
    } catch (error) {
        console.log("Hubo un error al intentar actualizar el carrito: ", error)
    }
});

routerCarritos.get("/carritos", async (res,req) => {
    try {
        const carrito = await carritoSchema.find()
        res.send("Carritos: ", carrito)
    } catch (error) {
        console.log("Hubo un error al intentar obtener los carritos: ", error)
    }
});

routerProductos.get("/carritos/:id", async (res,req) => {
    try {
        const id = req.params;
        const carrito = await carritoSchema.findById({_id: id})
        res.send("Carrito: ", carrito)
    } catch (error) {
        console.log("Hubo un error al intentar obtener el carrito: ", error)
    }
});

routerCarritos.delete("/carritos/:id", async (res,req) => {
    try {
        const id = req.params;
        const carrito = await carritoSchema.remove({_id: id})
        res.send("El carrito fue eliminado con exito!")
    } catch (error) {
        console.log("Hubo un error al intentar eliminar el carrito: ", error)
    }
});


export default routerCarritos;