const express = require('express');
const {
    Router
} = express;
const app = express();
const routerProductos = express.Router()

const Contenedor = require('./contenedor');
const nuevo = new Contenedor('./productos.txt');

const port = 8080;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({
    extended: true
}));

app.set('views', './views')
app.set('view engine', 'ejs')

/* const routerProductos = new Router(); */
routerProductos.use(express.json());

routerProductos.get('/productos', async (req, resp) => {
    try {
        const array1 = await nuevo.getAll()
        const array2 = []
        array1.forEach(ele => {
            let msj = `
                <img src=${ele.thumbnail}>      
                <h1>${ele.title}</h1>
                <h4>$${ele.price}</h4>
                `
            array2.push(msj)
        })
        /* resp.json(array1) */
        resp.send(`${array2}`)
    } catch (error) {
        console.log(error)
    }
})

routerProductos.get('/productos/:id', async (req, resp) => {
    const id = parseInt(req.params.id)
    try {
        const producto = await nuevo.getById(id)
        if (producto !== undefined) {
            const product = `
                <img src=${producto[0].thumbnail}>      
                <h1>${producto[0].title}</h1>
                <h4>$${producto[0].price}</h4>
                `;
            resp.send(`${product}`)
        }else{
            return resp.send("Este producto no existe")
        }
        /* resp.json(producto) */
    } catch (error) {
        console.log(error)
    }
})

routerProductos.post('/productos', async (req, resp) => {
    const {
        body
    } = req
    console.log(body)
    try {
        await nuevo.save(body)
        const productos = await nuevo.getAll()
        const nuevoProducto = productos.filter(ele => ele.title === body.title)
        console.log(nuevoProducto)
        /* resp.send(`Se agrego el producto ${nuevoProducto.title}, con el id: ${nuevoProducto.id} `) */
        resp.json(productos)
    } catch (error) {
        console.log(error)
    }
})

routerProductos.put('/productos/:id', (req,resp)=>{
    //recibe objeto, busca por el id ingresado y lo modifica segun lo ingresado
    const id = req.params.id
    const producto = nuevo.getById(id)
    if (producto!==undefined) {
        const { title, price } = req.body
        if (title !== undefined && price !== undefined) { //no se necesita gracias al required en el form
            const productoActualizado = nuevo.update(id, title, price)
            return res.json(productoActualizado)
        }
        return res.json({ error : 'complete el formulario' })
    }
    return res.json({ error : 'no existe el producto' })

}) 

routerProductos.delete('/productos/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        const existe = nuevo.getById(id)
        if (existe!== undefined){
            await nuevo.deleteById(id)
            resp.send(`Se elimino el producto con el id: ${id}`)
        }else{
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