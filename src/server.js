const express = require('express');
const { Router } = express;
const app = express();
const routerProductos = express.Router()

//handlebars
const exphbs = require("express-handlebars");
app.engine("hbs", exphbs.engine());

app.set('views', __dirname + 'views')
app.set('view engine', 'hbs')

const Contenedor = require('../contenedor');
const nuevo = new Contenedor('../productos.txt');

const port = 8080;

//app.use(express.static(__dirname + "./public"));
app.use(express.urlencoded({
    extended: true
}));





/* const routerProductos = new Router(); */
routerProductos.use(express.json());

routerProductos.get('/productos', async (req, resp) => {
    try {
        const array1 = await nuevo.getAll()
        resp.json(array1) 
    } catch (error) {
        console.log(error)
    }
})

routerProductos.get('/productos/:id', async (req, resp) => {
    const id = parseInt(req.params.id)
    try {
        const producto = await nuevo.getById(id)
        if (producto !== undefined) {
            resp.json(producto)
        } else {
            return resp.send("Este producto no existe")
        }
    } catch (error) {
        console.log(error)
    }
})

routerProductos.post('/productos', async (req, resp) => {
    const { body } = req
    console.log(body)
    try {
        await nuevo.save(body)
        const productos = await nuevo.getAll()
        resp.send(`Se agrego el producto: "${body.title}"`) 
        //resp.json(productos)
    } catch (error) {
        console.log(error)
    }
})

routerProductos.put('/productos/:id', async (req, resp) => {
    //recibe objeto, busca por el id ingresado y lo modifica segun lo ingresado
    const id = req.params.id
    const producto = await nuevo.getById(id)
    console.log(producto)
    if (producto != undefined) {
        const { title, price } = req.body;
        if (title != undefined && price != undefined) { //no se necesita gracias al required en el form
            const productoActualizado = await nuevo.update(id, title, price)
            return resp.send(productoActualizado)
        }else{
            return resp.send('Complete el formulario!');
        }
    }else{
        return resp.json({error: 'No existe el producto.'})
    }
})

routerProductos.delete('/productos/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        const existe = await nuevo.getById(id)
        if (existe !== undefined) {
            await nuevo.deleteById(id)
            resp.send(`Se elimino el producto con el id: ${id}`)
        } else {
            resp.send("Este producto no existe")
        }
    } catch (error) {
        console.log(error)
    }
})

app.use('/', routerProductos)

const server = app.listen(port, () => {
    console.log(`Servidor corriendo en https://localhost:${port}`)
});

server.on("error", (error) => {
    console.log("Error en el servidor", error);
});