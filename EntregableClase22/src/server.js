const express = require("express")
const app = express();
const handlebars = require('express-handlebars');

//Como cambiar esto? Sacarlo de server
const router = express.Router();
const routerTest = express.Router();
const ContenedorProductos = require('./Containers/contenedorProductos');
const ContenedorMensajes = require ("./Containers/contenedorMensajes");
const nuevo = new ContenedorProductos("./Persistence/productos.txt");
const arrayMensajes = new ContenedorMensajes("./Persistence/mensajes.txt");
//---------------------------------

//Socket.io
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const routerCarritos = require("./Routes/routerCarritos");
const routerProductos = require("./Routes/routerProductos");

const port = 8080;
const administrador = true;


//Detecta una nueva conexion, la informa y envia los mensajes almacenados, si se detecta un msj nuevo, lo envia
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    const productos = await nuevo.getAll();
    const mensajes = await arrayMensajes.getMensajes();

    socket.emit('mensajes', mensajes);
    socket.emit('productos', productos);

    socket.on('new-product', async data =>{
        console.log(data)
        const newProduct = await nuevo.save(data);
        productos.push(newProduct);
        io.sockets.emit('productos', productos);
    })

    socket.on("delete-product", async data =>{
        const nuevoArray = await nuevo.deleteById(data);
        io.sockets.emit('productos', nuevoArray);
    })
    socket.on('new-message', async data => {
        const nuevosMensajes = await arrayMensajes.nuevoMensaje(data)
        io.sockets.emit('mensajes', nuevosMensajes);
    })
});

app.set('views', '../public/views/layouts')
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));
app.use(express.json());

app.use('/', routerProductos);
app.use('/', routerCarritos);
app.use('/', router);
app.use('/', routerTest);

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: '../public/views/layouts',
    partialsDir: '../public/views/partials'
}))

const server = httpServer.listen(port, () => {
    console.log(`Servidor corriendo en https://localhost:${port}`)
});

server.on("error", (error) => {
    console.log("Error en el servidor", error);
});

router.get('/', async (req, resp) => {
    try {
        resp.render('index');
    } catch (error) {
        console.log(error);
    }
})

routerTest.get("/api/test", (req,resp) =>{
    try {
        resp.render('indexTest',); //Carga index en vez de indexTest
    } catch (error) {
        console.log(error);
    }
})







