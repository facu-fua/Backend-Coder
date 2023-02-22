import express, {
    json,
    urlencoded
} from "express";
import exphbs from "express-handlebars";
import path from "path";
import mongoDbConnection from "./src/config/mongoDbAtlas.js";
import os from "node:os";
import cluster from "cluster";
import session from "express-session";

//Router Imports
import homeRouter from "./src/routes/homeRouter.js";
import loginRouter from "./src/routes/loginRouter.js"
import registerRouter from "./src/routes/registerRouter.js"
import authRouter from "./src/routes/authRouter.js";
import cartRouter from "./src/routes/cartRouter.js";
import productsRouter from "./src/routes/productsRouter.js";

//__dirname
import {
    fileURLToPath
} from 'url';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const mode = process.argv[3] || 'fork';

if (mode == 'cluster' && cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    console.log(`Primary ${process.pid} is running`);
    console.log(`número de procesadores: ${numCPUs}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log(`worker ${worker.process.pid} died`, new Date().toLocaleString());
        cluster.fork();
    })
} else {

    mongoDbConnection();

    //Middlewares
    app.use(json());
    app.use(urlencoded({
        extended: true
    }));
    app.use(express.static('./public'));

    //Handlebars
    app.set('views', path.join(__dirname, 'src/views'))
    app.engine('.hbs', exphbs.engine({
        extname: '.hbs',
        defaultLayout: "main.hbs",
        layoutsDir: __dirname + '/src/views/layouts',
        partialsDir: __dirname + '/src/views/partials'
    }));
    app.set('view engine', '.hbs');

    app.use(session({
        secret: "123",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        }
    }));

    app.use("/", homeRouter);
    app.use("/", authRouter);
    app.use("/", cartRouter);
    app.use("/", loginRouter);
    app.use("/", productsRouter);
    app.use("/", registerRouter);


    //Conexion
    const port = process.env.PORT || 8080;
    const server = app.listen(port, () => console.log(`Servidor express escuchando en http://localhost:${port} - PID ${process.pid}`));
    server.on('error', error => console.log(`Error en servidor ${error}`));
}