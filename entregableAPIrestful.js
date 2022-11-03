const express = require('express');
const {Router} = express;
const app = express();

const port = 8080;
const server = app.listen(port,()=>{
    console.log(`Servidor escuchando en https://localhost:${port}`)
});

server.on("error", (error)=>{
    console.log("Error en el servidor",error);
});

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}));

const routerProductos = new Router();
routerProductos.use(express.json);

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async getAll() {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            return array
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    }

    async getById(id) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            const objeto = array.filter(ele => ele.id === id)
            if (objeto.length !== 0) {
                return objeto
                //console.log(objeto)
            } else {
                console.log("Ese producto no existe")
            }
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    }

    async save(obj) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            let idMax = 0
            array.forEach((element) => {
                if (element.id > idMax) {
                    idMax = element.id;
                }
            })
            const id = idMax + 1;
            const nuevoObj = {
                id: id,
                title: obj.title,
                price: obj.price,
                thumbnail: obj.thumbnail
            }
            array.push(nuevoObj)

            await fs.promises.writeFile(this.ruta, JSON.stringify(array, null, 2), error => {
                console.log(error)
            })
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    }

    async deleteById(id) {
        try {
            //traigo el array de objetos
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"))
            //utilizo metodo de arrays para borrar al que le pase por id
            const nuevoArray = array.filter(ele=>ele.id!==id)
            console.log(nuevoArray)
            //reescribo el contenido en el archivo
            const reEscribir = await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoArray, null, 2), error => {
                console.log(error)
            })
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    }
}

const nuevo = new Contenedor("./productos.txt");

routerProductos.get('/productos', async (req, resp) => {
    try {
        const array1 = await nuevo.getAll()
        console.log(array1)
        const array2 = []
        array1.forEach(ele => {
            let msj = `
                <img src=${ele.thumbnail}>      
                <h1>${ele.title}</h1>
                <h4>$${ele.price}</h4>
                `
            array2.push(msj)
        })
        console.log(array2)
        resp.send(`${array2}`)
    } catch (error) {
        console.log(error)
    }
})

routerProductos.get('/productos/:id', async (req, resp) => {
    const id = req //pasar id ingresado
    try {
        const producto = await nuevo.getById(id)
        const product = `
                <img src=${ele.thumbnail}>      
                <h1>${ele.title}</h1>
                <h4>$${ele.price}</h4>
                `;
        resp.send(`${product}`)
    } catch (error) {
        console.log(error)
    }
})

routerProductos.post('/productos', async (req,resp)=>{
    const obj = req //pasar objeto ingresado en el formulario
    try {
        const producto = await nuevo.save(obj)
        resp.send(`Se agrego el producto ${producto.title}, con el id: ${producto.id}`)
    } catch (error) {
        console.log(error)
    }
})

routerProductos.put('/productos/:id', (req,resp)=>{
    //recibe objeto, busca por el id ingresado y lo modifica segun lo ingresado

})

routerProductos.delete('/productos/id', async (req, resp)=>{
    const id = req;
    try {
        await nuevo.deleteById(id)
        resp.send(`Se elimino el producto con el id: ${id}`)
    } catch (error) {
        console.log(error)
    }
})


