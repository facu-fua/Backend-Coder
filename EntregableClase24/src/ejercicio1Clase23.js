import express from "express"
import cookieParser from "cookie-parser";


const app = express();

app.use(cookieParser("123"));
app.use(express.json());


app.get("/cookies", (req,res) => {
    res.json({ normales: req.cookies , firmadas: req.signedCookies });
});

//Post para crear cookies
app.post("/cookies", (req,res) => {
    //se podria agregar si va firmada o no
    const { name, value, time, signed} = req.body;
    if (!name || !value){
        res.status(400).json({error: "Name or value missing!"});
    };
    if(time){
        //creo una cookie con los valores pasados en req.body
        res.cookie(name, value, {signed: signed, maxAge: time});
    }else{
        res.cookie(name,value, {signed: signed});
    };
    res.json({proceso: "ok"});
})

app.delete("/cookies/:name", (req,res) => {
    const { name } = req.params;
    if(name){
        //faltaria un filtro para verificar que la cookie exista y sino error
        res.clearCookie(name);
        res.json({proceso: "ok"});
    } else {
        res.status(400).json({error: "Missing cookie name"});
    }

})

//Conexion
const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`Servidor corriendo en https://localhost:${port}`)
})
server.on("error", (error) => {
    console.log("Error en el servidor", error);
});