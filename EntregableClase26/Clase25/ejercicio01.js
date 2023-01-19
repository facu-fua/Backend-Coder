import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";

//persistencia, reemplazar con bd
const usuarios = [];

const app = express()

// middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(session({
    secret: "123",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "main.hbs"
}));
app.set("view engine", ".hbs");
app.use(express.static('public'));

//rutas
app.get("/register", (res, req) => {
    //manda el archivo que queremos como vista
    res.sendFile(__dirname + "views/register.html");
});

app.post("/register", (res, req) => {
    //Si el usuario existe da error, sino lo registra y envia al login
    const {
        nombre,
        password,
        direccion
    } = req.body;
    const usuario = usuarios.find(u => u.nombre === nombre);
    if (nombre) {
        return res.render("registerError");
    } else {
        usuarios.push({
            nombre,
            password,
            direccion
        });
        res.redirect("login");
    }
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

app.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;
    const usuario = usuarios.find(u => u.username === username && u.password === password);

    if (!usuario) {
        return res.render('login-error');
    }
    //Si existe el usuario, crea una sesion en su nombre e inicia el contador
    req.session.username = username;
    req.session.contador = 0;
    res.redirect('/datos')
});

app.get('/datos', (req, res) => {
    if (req.session.username) {
        req.session.contador++;
        res.render('datos', {
            datos: usuarios.find(u => u.username === req.session.username),
            contador: req.session.contador
        });
    } else {
        return res.redirect('/login')
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/login');
    });
});

app.get('/', (req, res) => {
    if (req.session.username) {
        res.redirect('/datos')
    } else {
        res.redirect('/login')
    }
});

//Conexion
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
server.on("error", (error) => {
    console.log("Error en el servidor", error);
});