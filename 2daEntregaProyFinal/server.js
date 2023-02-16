import  express, { json, urlencoded } from "express";
import exphbs from "express-handlebars";
import path from "path";

//__dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Middlewares
app.use(json());
app.use(urlencoded({
    extended: true
}));
app.use(express.static('./public'));

//Handlebars
app.set('views', path.join(__dirname, 'src/views/layouts'))

app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    layoutsDir: __dirname + '/src/views/layouts',
    partialsDir: __dirname + '/src/views/partials'
}));
app.set('view engine', '.hbs');

app.use("/", (req,res) => {
    console.log("Hello")
    res.render("index")
})

app.use("/register", (req,res)=>{
    res.render("register")
})

app.use("/login", (req,res)=>{
    res.render("login")
})



//Conexion
const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Servidor express escuchando en http://localhost:${port} - PID ${process.pid}`));
server.on('error', error => console.log(`Error en servidor ${error}`));