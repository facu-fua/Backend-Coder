const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const routerProductos = express.Router()
const Contenedor = require('./contenedor');
const nuevo = new Contenedor('./productos.txt');

//Solucionar: cada vez que uso el link a productos, se carga un item vacio

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use('/', routerProductos)

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

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
        resp.render('tabla', {array1});
    } catch (error) {
        console.log(error);
    }
    
});

//En Handlebars no me carga el formulario, solo puede renderizar algo a la vez? crear otro router
/*routerProductos.post('/', async (req, resp) => {
    const { body } = req;
    const newProduct = {};
    try {
        newProduct = await nuevo.save(body);
        const productos = await nuevo.getAll();
        resp.render('form');
        //resp.json(productos)
    } catch (error) {
        console.log(error);
    }    
});/*

//Esto no renderiza el form, hay que usar un get
/* app.post('/', async (req, resp) => {
    const { body } = req;
    const newProduct = {};
    try {
        newProduct = await nuevo.save(body);
        const productos = await nuevo.getAll();
        resp.render('form');
        //resp.json(productos)
    } catch (error) {
        console.log(error);
    }    
}) */

app.get('/', async (req, resp) => {
    const { body } = req;
    try {
        await nuevo.save(body);
        resp.render('form');
    } catch (error) {
        console.log(error);
    }    
})

