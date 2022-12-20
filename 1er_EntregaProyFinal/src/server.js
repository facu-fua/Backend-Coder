const express = require('express');
const app = express();
const routerProductos = express.Router()
const routerCarrito = express.Router()
const ContenedorProductos = require('../contenedorProductos');
const objetoProducto = new ContenedorProductos('./productos.txt');
const ContenedorCarrito = require("../contenedorCarrito");
const objetoCart = new ContenedorCarrito("./fileSystem.txt")

const port = 8080;
const administrador = true;

routerProductos.use(express.json());
routerCarrito.use(express.json());

app.use(express.static('./public'));
app.use(express.urlencoded({
    extended: true
}));
app.use('/', routerProductos);
app.use('/', routerCarrito);


const server = app.listen(port, () => {
    console.log(`Servidor corriendo en https://localhost:${port}`)
});

server.on("error", (error) => {
    console.log("Error en el servidor", error);
});


/* routerProductos.get('/api/productos', async (req, resp) => {
    try {
        const array1 = await objetoProducto.getAll()
        resp.json(array1)
    } catch (error) {
        console.log(error)
    }
}) */

// Chat

// CRUD Productos
routerProductos.get('/api/productos/:id?', async (req, resp) => {
    const id = parseInt(req.params.id)
    try {
        if (id.toString()=="NaN"){
            const array1 = await objetoProducto.getAll()
            resp.json(array1)
        }else{
            const producto = await objetoProducto.getById(id)
            if (producto !== undefined) {
                resp.json(producto)
            } else {
                return resp.send("Este producto no existe")
            }
        }
    } catch (error) {
        console.log(error)
    }
})

routerProductos.post('/api/productos', async (req, resp) => {
    const { body } = req
    console.log(body)
    if (administrador){
        try {
            await objetoProducto.save(body)
            const productos = await objetoProducto.getAll()
            resp.send(`Se agrego el producto: "${body.title}"`) 
            //resp.json(productos)
        } catch (error) {
            console.log(error)
        }
    }else{
        resp.json({error: -2, descripcion: `ruta "x" metodo "y no implementada"`})
    }
})

routerProductos.put('/api/productos/:id', async (req, resp) => {
    //recibe objeto, busca por el id ingresado y lo modifica segun lo ingresado
    const id = req.params.id
    const producto = await objetoProducto.getById(id)
    console.log(producto)
    if(administrador){
        if (producto != undefined) {
            const { title, price } = req.body;
            if (title != undefined && price != undefined) { //no se necesita gracias al required en el form
                const productoActualizado = await objetoProducto.update(id, title, price)
                return resp.send(productoActualizado)
            }else{
                return resp.send('Complete el formulario!');
            }
        }else{
            return resp.json({error: 'No existe el producto.'})
        }
    }else{
        resp.json({error: -2, descripcion: `ruta "x" metodo "y no implementada"`})
    }
})

routerProductos.delete('/api/productos/:id', async (req, resp) => {
    const id = req.params.id;
    if (administrador){
        try {
            const existe = await objetoProducto.getById(id)
            if (existe !== undefined) {
                await objetoProducto.deleteById(id)
                resp.send(`Se elimino el producto con el id: ${id}`)
            } else {
                resp.send("Este producto no existe")
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        resp.json({error: -2, descripcion: `ruta "x" metodo "y no implementada"`})
    }
})

// CRUD Carrito
//falta agregar condicionales en caso de que los id no existan o no se encuentren
routerCarrito.get('/api/carrito/:id/productos', async ( req, resp) => {
    const id = parseInt(req.params.id);
    const cart = await objetoCart.getCartProductos(id);
    console.log(cart);
    resp.json(cart)
})

routerCarrito.post('/api/carrito', async ( req, resp) => {
    const newCart = await objetoCart.postCart();
    resp.send(`Nuevo carrito creado con exito! Id: ${newCart}`);
})

routerCarrito.post('/api/carrito/:id/productos/:id_prod', async ( req, resp) => {
    const idCarrito = parseInt(req.params.id);
    const idProducto = parseInt(req.params.id_prod);
    const producto = objetoCart.postIdProduct(idCarrito,idProducto);
    resp.send(`El producto: ${producto} fue añadido al carrito id: ${idCarrito}`)
})

routerCarrito.delete('/api/carrito/:id', async ( req, resp) => {
    const id = parseInt(req.params.id);
    const carts = objetoCart.getCarritos()
    const existe = carts.find(ele => ele.id == id);
    if (existe!=undefined){
        await objetoCart.removeCart(id)
        resp.send(`El carrito fue eliminado con exito!`);
    }else{
        resp.send(`El id del carrito no existe.`)
    }
})

routerCarrito.delete('/api/carrito/:id/productos/:id_prod', async ( req, resp) => {
    const idCarrito = parseInt(req.params.id);
    const idProducto = parseInt(req.params.id_prod);
    await objetoCart.removeProduct(idProducto,idCarrito);
    resp.send(`El producto con id: ${idProducto} fue eliminado del carrito id: ${idCarrito}`)
})


