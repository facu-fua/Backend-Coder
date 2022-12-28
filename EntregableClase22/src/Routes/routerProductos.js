const express = require('express');
const routerProductos = express.Router()
routerProductos.use(express.json());
const ContenedorProductos = require('../Containers/contenedorProductos');
const objetoProducto = new ContenedorProductos('../Persistence/productos.txt');

//Como pasar el valor de administrador desde server al resto de las rutas
const administrador = true

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

module.exports = routerProductos;