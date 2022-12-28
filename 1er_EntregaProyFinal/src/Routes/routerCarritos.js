const express = require('express');
const routerCarrito = express.Router()
routerCarrito.use(express.json());
const ContenedorCarrito = require("../../contenedorCarrito");
const objetoCart = new ContenedorCarrito("../Persistence/fileSystem.txt")

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

module.exports = routerCarrito;