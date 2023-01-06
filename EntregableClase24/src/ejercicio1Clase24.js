import express from "express";
import expressSession from "express-session";
import store from "session-file-store";
import cookieParser from "cookie-parser";
//const fileStore = require("session-file-store")(expressSession);

const app = express();
const FileStore = store(expressSession);
app.use(express.json());
app.use(cookieParser());

app.use(expressSession({
    store: new FileStore({ path: "./sesiones", ttl: 300, retries: 0}),
    secret: "123",
    resave: false,
    saveUninitialized: false
}));

app.get("/", (req,res) => {
    res.send("Servidor Express OK");
});

let counter = 0;

app.get("/sin-sesion", (req,res) => {
    res.send({ contador: ++counter });
    //Con el ++ adelante hace primero el incremento y despues muestra el valor, sino es al reves
    //Error: con cada f5 no aumenta el contador
});

app.get("/con-sesion", (req,res) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`Hola, esta es tu visita n° ${req.session.counter}`);
    } else {
        req.session.counter = 1;
        res.send(`Bienvenido!`);
    }
});

app.get("/logout", (req,res) => {
    req.session.destroy(error =>{
        if(error){
            res.status(400).json({error: "logout", body: error});
        } else {
            res.send(`LoggedOut: Volve pronto!`);
        }
    });
});

app.get("/info", (req,res) => {
    console.log("-----Req. Session-----");
    console.log(req.session);
    console.log("----------\n");
    console.log("-----Req. Session ID-----");
    console.log(req.sessionID);
    console.log("----------\n");
    console.log("-----Req. Cookies-----");
    console.log(req.cookies);
    console.log("----------\n");
    console.log("-----Req. Session Store-----");
    console.log(req.sessionStore);
    console.log("----------\n");
    res.send("Info en consola");
});

app.get("/info-web", (req,res) => {
    res.send({
        session: req.session,
        sessionID: req.sessionID,
        cookies: req.cookies
    });
});

//Conexion
const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
server.on("error", (error) => {
    console.log("Error en el servidor", error);
});