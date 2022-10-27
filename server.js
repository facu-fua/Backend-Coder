const express = require('express');
const app = express();

app.get('/', (req,resp)=>{
    resp.send('<h1>Bienvenido al servidor express</h1>');
})

let visitas = 0;
app.get('/productos', (req,resp)=>{
    resp.send(`La cantidad de visitas es ${visitas}`)
})
app.get('/productoRandom', (req,resp)=>{
    resp.send(`La cantidad de visitas es ${visitas}`)
})

const port = 8080;
const server = app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
server.on('error', (error)=>{
    console.log(`Error en el servidor ${error}`);
})