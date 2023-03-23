import express from "express";
import productoSchema from "../model/producto.js";

const routerProductos = express.Router();

//CRUD
routerProductos.post("/productos", async (res,req) => {
    const producto = productoSchema(req.body);
    try {
        const data = await producto.save();
        console.log("Producto agregado con exito ", data)
        res.json(data)
    } catch (error) {
        console.log("Hubo un error ", error);
    }
});

routerProductos.put("/productos/:id", async (res,req) => {
    try {
        const id = req.params;
        const {timeStamp, title, description, code, price, thumbnail, quantity} = req.body;
        const producto = await productoSchema.updateOne({_id: id}, { $set: {timeStamp, title, description, code, price, thumbnail, quantity}});
        res.send("Producto actualizado: ", producto)
    } catch (error) {
        console.log("Hubo un error al intentar actualizar el producto: ", error)
    }
});

routerProductos.get("/productos", async (res,req) => {
    try {
        const productos = await productoSchema.find()
        console.log(productos)
        res.send("Productos: ", productos)
    } catch (error) {
        console.log("Hubo un error al intentar obtener los productos: ", error)
    }
});

routerProductos.get("/productos/:id", async (res,req) => {
    try {
        const id = req.params;
        const producto = await productoSchema.findById({_id: id})
        console.log(producto)
        res.send("Producto: ", producto)
    } catch (error) {
        console.log("Hubo un error al intentar obtener el producto: ", error)
    }
});

routerProductos.delete("/productos/:id", async (res,req) => {
    try {
        const id = req.params;
        const producto = await productoSchema.remove({_id: id})
        console.log(producto)
        res.send("El producto fue eliminado con exito!")
    } catch (error) {
        console.log("Hubo un error al intentar eliminar el producto: ", error)
    }
});

export default routerProductos;