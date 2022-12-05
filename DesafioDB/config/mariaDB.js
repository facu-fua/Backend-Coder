import dotenv from "dotenv";
dotenv.config();

export const options = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,//datos sensibles, se borran al subir, con el dotenv se protegen
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
}; //mala practica, en la realidad no se hace asi