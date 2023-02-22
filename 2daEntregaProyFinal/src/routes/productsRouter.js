import express from "express";
import productoSchema from "../model/producto.js";

const productsRouter = express.Router();

//CRUD
productsRouter.post("/api/products", async (req,res) => {
    const producto = productoSchema(req.body);
    try {
        const data = await producto.save();
        console.log("Producto agregado con exito ", data)
        res.json(data)
    } catch (error) {
        console.log("Hubo un error ", error);
    }
});

productsRouter.put("/api/products/:id", async (req,res) => {
    try {
        const id = req.params;
        const {name, price, description, stock, thumbnail} = req.body;
        const producto = await productoSchema.updateOne({_id: id}, { $set: {name, price, description, stock, thumbnail}});
        res.send("Producto actualizado: ", producto)
    } catch (error) {
        console.log("Hubo un error al intentar actualizar el producto: ", error)
    }
});

productsRouter.get("/api/products", async (req,res) => {
    try {
        const productos = await productoSchema.find()
        console.log(productos);
        res.send(productos)
    } catch (error) {
        console.log("Hubo un error al intentar obtener los productos: ", error)
    }
});

productsRouter.get("/api/products/:id", async (req,res) => {
    try {
        const id = req.params;
        const producto = await productoSchema.findById({_id: id})
        console.log(producto)
        res.send("Producto: ", producto)
    } catch (error) {
        console.log("Hubo un error al intentar obtener el producto: ", error)
    }
});

productsRouter.delete("/api/products/:id", async (req,res) => {
    try {
        const id = req.params;
        const producto = await productoSchema.remove({_id: id})
        console.log(producto)
        res.send("El producto fue eliminado con exito!")
    } catch (error) {
        console.log("Hubo un error al intentar eliminar el producto: ", error)
    }
});

export default productsRouter;