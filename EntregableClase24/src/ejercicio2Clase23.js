import express from "express"
import expressSession from "express-session";

const app = express();

app.use(express.json());
app.use(cookieParser("123"));
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "123",
    resave: false,
    saveUninitialized: false
}))
//secret: el valor deberia ir en un env
//resave: Forces the session to be saved back to the session store, even if the session was never modified during the request.
//saveUninitialized: Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions.

const getNameSession = req => req.query.name? req.session.name = req.query.name : "Invitado";
//no olvidarse, al no utilizar los corchetes, el return es implicito

//A mejorar con el login: si cambias de nombre o no se coloca, no se reinicia el contador
app.get("/login", (req,res) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`Hola ${getNameSession(req)}, esta es tu visita n° ${req.session.counter}`)
    } else {
        req.session.counter = 1
        res.send(`Bienvenido ${getNameSession(req)}!`)
    }
})

app.get("/logout", (req,res) => {
    const name = getNameSession(req);
    req.session.destroy(error =>{
        if(error){
            res.status(400).json({error: "logout", body: error})
        } else {
            res.send(`LoggedOut: Volve pronto ${name}!`)
        }
    });
})

//Conexion
const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
server.on("error", (error) => {
    console.log("Error en el servidor", error);
});