import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


//hacer archivo .env para seguridad, despues de mongodb.net/"nombredeladb"?..., que se puede reemplazar por el env
export default async function connection(){
    try {
        const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@proyectocoder.tcyjleq.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Base de datos conectada")
    } catch (error) {
        console.log("Error al conectar con MongoDB Atlas: ", error);
    }
};