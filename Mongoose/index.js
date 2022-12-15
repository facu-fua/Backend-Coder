import mongoose from "mongoose";
import * as model from "./model/usuarios";

async function CRUD(){
    try {
        const url = "mongodb://localhost:27017/ecommerce";
        let rta = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Base de datos conectada")
    } catch (error) {
        console.log(error);
    }
};