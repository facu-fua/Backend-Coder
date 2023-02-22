import express from "express";
import carritoSchema from "../model/carrito.js";

const cartRouter = express.Router();

//CRUD CON MONGODB
cartRouter.post("/cart", async (req,res) => {
    const carrito = carritoSchema(req.body);
    try {
        const data = await carrito.save();
        console.log("Carrito agregado con exito ", data)
        res.json(data)
    } catch (error) {
        console.log("Hubo un error ", error);
    }
});

cartRouter.put("/cart", async (req,res) => {
    try {
        const id = req.params;
        const {userId, cartProducts} = req.body;
        const carrito = await carritoSchema.updateOne({_id: id}, { $set: {cartProducts}});
        res.send("Carrito actualizado: ", carrito)
    } catch (error) {
        console.log("Hubo un error al intentar actualizar el carrito: ", error)
    }
});

cartRouter.get("/cart", async (req,res) => {
    try {
        const carrito = await carritoSchema.find()
        res.render("cart", { title: "Cart", cart: carrito });
    } catch (error) {
        console.log("Hubo un error al intentar obtener los carritos: ", error)
    }
});

cartRouter.get("/cart/:id", async (req,res) => {
    try {
        const id = req.params;
        const carrito = await carritoSchema.findById({_id: id})
        res.send("Carrito: ", carrito)
    } catch (error) {
        console.log("Hubo un error al intentar obtener el carrito: ", error)
    }
});

cartRouter.delete("/cart/:id", async (req,res) => {
    try {
        const id = req.params;
        const carrito = await carritoSchema.remove({_id: id})
        res.send("El carrito fue eliminado con exito!")
    } catch (error) {
        console.log("Hubo un error al intentar eliminar el carrito: ", error)
    }
});

export default cartRouter;