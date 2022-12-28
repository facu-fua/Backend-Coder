const express = require('express');
const app = express();

const routerCarritos = require("./Routes/routerCarritos");
const routerProductos = require("./Routes/routerProductos");

const port = 8080;
const administrador = true;

app.use(express.static('./public'));
app.use(express.urlencoded({
    extended: true
}));
app.use('/', routerProductos);
app.use('/', routerCarritos);


const server = app.listen(port, () => {
    console.log(`Servidor corriendo en https://localhost:${port}`)
});

server.on("error", (error) => {
    console.log("Error en el servidor", error);
});


// Chat






