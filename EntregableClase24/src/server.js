import express from "express";
import MongoStore from "connect-mongo";
import expressSession, { Cookie } from "express-session";
import dotenv from "dotenv";
dotenv.config();

const advanceOptions = {useNewUrlParser: true, useUnifiedTopology: true};
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;
const app = express();
app.use(express.json());
app.use(expressSession({
    store: MongoStore.create({mongoUrl: url, mongoOptions: advanceOptions}),
    secret: "123",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 600000}
}));
//600000 ms = 10 min de vida a la cookie (tiempo de sesion por usuario)

app.get("/", (req,res) => {
    res.send("Servidor Express OK");
});

app.get("/login", (req,res) => {
    //Obtenemos usuario del form
    if(req.session.counter){
        req.session.counter++;
        console.log(req.session)
        //Prueba
        res.write(`<h1>Bienvenido!</h1>`)
        res.write(`<button>Logout</button>`)
        //res.send(`Hola, esta es tu visita n° ${req.session.counter}`);
        res.end()
    } else {
        req.session.counter = 1;
        res.send(`Bienvenido!`);
    }
})

app.get("/logout", (req,res) => {
    req.session.destroy(error =>{
        if(error){
            res.status(400).json({error: "logout", body: error})
        } else {
            res.send(`LoggedOut: Volve pronto!`)
        }
    });
})

//Conexion
const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
server.on("error", (error) => {
    console.log("Error en el servidor", error);
});