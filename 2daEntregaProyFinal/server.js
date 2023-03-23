import express, { json, urlencoded } from "express";
import exphbs from "express-handlebars";
import path from "path";
import mongoDbConnection from "./src/config/mongoDbAtlas.js";
import os from "node:os";
import cluster from "cluster";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";

//Router Imports
import homeRouter from "./src/router/homeRouter.js";
import loginRouter from "./src/router/loginRouter.js"
import signupRouter from "./src/router/signupRouter.js"
import authRouter from "./src/router/authRouter.js";
import cartRouter from "./src/router/cartRouter.js";
import productsRouter from "./src/router/productsRouter.js";
import confirmationRouter from "./src/router/confirmation.js";

//__dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
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

    //Passport
    passport.use("login", new localStrategy(
        (username, password, done) => { //reemplazar por busqueda en mongoDb
            User.findOne({
                username
            }, (err, user) => {
                if (err)
                    return done(err);
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }
                return done(null, user);
            });
        }));

    function isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }

    passport.use('signup', new localStrategy({ passReqToCallback: true }, (req, username, password, done) => {
        User.findOne({ 'username': username}, function (err, user) {
            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            }
            if (user) {
                console.log('User already exists');
                return done(null, false)
            }
            const newUser = {
                username: username,
                password: createHash(password),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }
            User.create(newUser, (err, userWithId ) => {
                if (err) {
                    console.log('Error in Saving user: ' + err);
                    return done(err);
                }
                console.log(user)
                console.log('User Registration succesful' );
                return done(null, userWithId );
            })
        })
    }))

    function createHash (password ) {
        return bCrypt.hashSync ( password, bCrypt.genS)
    };

    //Middlewares
    app.use(json());
    app.use(urlencoded({ extended: true }));
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
        secret: "123", //guardar en .env
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
    app.use("/", signupRouter);
    app.use("/", confirmationRouter)


    //Conexion
    const port = process.env.PORT || 8080;
    const server = app.listen(port, () => console.log(`Servidor express escuchando en http://localhost:${port} - PID ${process.pid}`));
    server.on('error', error => console.log(`Error en servidor ${error}`));
}