const express = require ("express");
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

const server = app.listen(port, ()=>{
    console.log(`Servidor htto escuchando en el puerto ${port}`)
});
server.on("error", error =>{
    console.log("Error en el servidor: ",error);
});

