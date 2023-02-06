import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connection(){
    try {
        const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Base de datos conectada")
    } catch (error) {
        console.log("Error al conectar con MongoDB Atlas: ", error);
    }
};