const fs = require("fs");
const {
    json
} = require("stream/consumers");

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    //Recibe un objeto, lo guarda y devuelve el id que se le asigno
    async save(obj) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            const idUltimoObj = array.forEach(element => {
                let idMax = 0
                if (element.id > idMax){
                    idMax = element.id
                    console.log(idMax,element.id)
                }
                return idMax
            })
            console.log(idUltimoObj)
            const id=idUltimoObj+1;
            console.log(id,idUltimoObj)
            /* nuevoObj = {
                id: id,
                title: obj.title,
                price: obj.price,
                thumbnail: obj.thumbnail
            }
            await fs.promises.appendFile(this.ruta, obj, error=>{console.log(error)}) */
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    }

    //Devuelve el objeto por id o null si no esta
    async getById(id) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            const objeto = array.filter(ele => ele.id === id)
            if (objeto.length !== 0) {
                console.log(objeto)
            } else {
                console.log("Ese producto no existe")
            }
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    }

    //Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            console.log(array);
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
            const nuevoArray = array.splice(id, 1)
            console.log(nuevoArray)
            //reescribo el contenido en el archivo
            const reEscribir = await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoArray,null,2), error => {
                console.log(error)
            })
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    }

    //Elimina todos los objetos del archivo
    async deleteAll() {
        try {
            const vaciar = await fs.promises.writeFile(this.ruta, [], error => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Vaciado con exito!")
                }
            })
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    } // :void
}

const nuevo = new Contenedor("./archivo.txt")
nuevo.save()