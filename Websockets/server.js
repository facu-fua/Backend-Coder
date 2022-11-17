const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const routerProductos = express.Router()
const Contenedor = require('./contenedor');
const nuevo = new Contenedor('./productos.txt');


//Socket.io
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');
    socket.emit('mensajes', mensajes);

    socket.on('new-message', data => {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    })
});

//Solucionar: cada vez que uso el link a productos, se carga un item vacio

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/', routerProductos)

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

const port = 8080;

const server = httpServer.listen(port, () => {
    console.log(`servidor escuchando en http://localhost:${port}`);
});
server.on("error", (error) => {
    console.log("Error en el servidor", error);
});


routerProductos.get('/productos', async (req, resp) => {
    try {
        const array1 = await nuevo.getAll();
        resp.render('tabla', {
            array1
        });
    } catch (error) {
        console.log(error);
    }

});





const mensajes = [];



