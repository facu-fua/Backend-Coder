const fs = require('fs')

class ContenedorProductos {
    constructor(ruta) {
        this.ruta = ruta;
    }

    //Recibe un objeto, lo guarda y devuelve el id que se le asigno
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
                timeStamp: Date.now(),
                title: obj.title,
                description: obj.description,
                code: obj.code,
                price: obj.price,
                thumbnail: obj.thumbnail,
                quantity: obj.quantity
            }
            array.push(nuevoObj)
            await fs.promises.writeFile(this.ruta, JSON.stringify(array, null, 2), error => {
                console.log(error)
            })
            return(nuevoObj)
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    }

    //Devuelve el objeto por id o null si no esta
    //darle return al objeto reemplazando el console log
    async getById(id) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            const objeto = array.find(ele => ele.id == id)
            if (objeto !== undefined) {
                return objeto
            } else {
                return (undefined)
            }
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    }

    //Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            return array
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    }; // :Object[]

    //Elimina el objeto del archivo por id
    async deleteById(id) {
        try {
            //traigo el array de objetos
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"))
            //utilizo metodo de arrays para borrar al que le pase por id
            const nuevoArray = array.filter(ele => ele.id != id)
            //reescribo el contenido en el archivo
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoArray, null, 2), error => {
                console.log(error)
            })
            return nuevoArray;
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    }

    //Elimina todos los objetos del archivo
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), error => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Vaciado con exito!")
                }
            })
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    }

    async update(id, title, price) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"))
            const producto = array.find(ele => ele.id == id)
            producto.title = title;
            producto.price = price;
            const nuevoArray = array.filter(ele => ele.id != id)
            nuevoArray.push(producto)
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoArray, null, 2), error => {
                console.log(error)
            })
            return producto;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ContenedorProductos;