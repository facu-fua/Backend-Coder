const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const routerProductos = express.Router()
const Contenedor = require('./contenedor');
const nuevo = new Contenedor('./productos.txt');

const mensajes = [];

//Socket.io
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


//Detecta una nueva conexion, la informa y envia los mensajes almacenados, si se detecta un msj nuevo, lo envia
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');
    const productos = await nuevo.getAll();
    socket.emit('mensajes', mensajes);
    socket.emit('productos', productos);

    socket.on('new-product', async data =>{
        console.log(data)
        const newProduct = await nuevo.save(data);
        productos.push(newProduct);
        io.sockets.emit('productos', productos);
    })
    socket.on('new-message', data => {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    })
});

//Solucionar: cada vez que uso el link a productos, se carga un item vacio

app.set('views', __dirname + '/public/views/layouts')
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/', routerProductos)

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/public/views/layouts',
    partialsDir: __dirname + '/public/views/partials'
}))

const port = 8080;

const server = httpServer.listen(port, () => {
    console.log(`servidor escuchando en http://localhost:${port}`);
});
server.on("error", (error) => {
    console.log("Error en el servidor", error);
});


routerProductos.get('/', async (req, resp) => {
    try {
        resp.render('index');
    } catch (error) {
        console.log(error);
    }
})









