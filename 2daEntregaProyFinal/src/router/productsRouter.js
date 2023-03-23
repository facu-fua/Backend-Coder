import express from "express";
import productoSchema from "../model/models/producto.js";
import productPost from "../controller/productController.js";
import productPut from "../controller/productController.js"

const productsRouter = express.Router();

//CRUD
productsRouter.post("/api/products", async (req,res) => {
    productPost(req.body)
    res.send("Producto Agregado con Exito!")
});

productsRouter.put("/api/products/:id", async (req,res) => {
    productPut(req.body, req.params);
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