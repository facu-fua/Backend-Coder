//Imports
import express from "express";
import mongoose from "mongoose";
import mongoConnection from "./config/mongoDbAtlas.js";
//Routes
import productRoutes from "./routes/productosRouter.js";
import carritoRoutes from "./routes/carritosRouter.js";

//Conection
const app = express();
const port = 8080
const administrador = true;
const server = app.listen(port, () => {
    console.log(`Servidor corriendo en https://localhost:${port}`)
});
server.on("error", (error) => {
    console.log("Error en el servidor", error);
});

//middleware
app.use(express.static('./public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'))
app.use("/api", productRoutes)
app.use("/api", carritoRoutes)


//mongoDb Atlas conection
mongoConnection();



