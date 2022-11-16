const express = require('express');
const app = express();
const routerProductos = express.Router()
const Contenedor = require('./contenedor');
const nuevo = new Contenedor('./productos.txt');


app.set('views', __dirname + '/views') //puede ser ./views
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use('/', routerProductos)


const port = 8080;
const server = app.listen(port, () => {
    console.log(`Servidor corriendo en https://localhost:${port}`)
});

server.on("error", (error) => {
    console.log("Error en el servidor", error);
});


routerProductos.get('/productos', async (req, resp) => {
    try {
        const array1 = await nuevo.getAll();
        resp.render('pages/index', {array1});
    } catch (error) {
        console.log(error);
    }
});

routerProductos.post('/productos', async (req, resp) => {
    const { body } = req;
    try {
        const newProduct = await nuevo.save(body);
        resp.render('pages/index', {newProduct});
    } catch (error) {
        console.log(error);
    }    
});

