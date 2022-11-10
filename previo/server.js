const express = require("express");
const app = express();
const port = 8080;
const fs = require("fs");

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
}

const nuevo = new Contenedor("./productos.txt");



app.get("/", (req, resp) => {
    resp.send("<h1>Bienvenido al servidor express</h1>");
});

//muestra los productos disponibles
app.get("/productos", async (req, resp) => {
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

app.get("/productoRandom", async (req, resp) => {
    try {
        const array1 = await nuevo.getAll();
        console.log(array1.length)
        function getRandom(num) {
            return Math.floor(Math.random() * num);
        }
        const producto = array1[getRandom(array1.length)]
        console.log(producto)
        resp.send(`
                <img src=${producto.thumbnail}>      
                <h1>${producto.title}</h1>
                <h4>$${producto.price}</h4>`)
    } catch (error) {
        console.log(error)
    }
});

const server = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
server.on("error", (error) => {
    console.log(`Error en el servidor ${error}`);
});