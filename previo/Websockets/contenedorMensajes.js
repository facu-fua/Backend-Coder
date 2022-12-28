const fs = require('fs')

class ContenedorMensajes {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async getMensajes() {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            return array
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    };

    async nuevoMensaje(obj) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            array.push(obj)
            await fs.promises.writeFile(this.ruta, JSON.stringify(array, null, 2), error => {
                console.log(error)
            })
            return array;
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    }

    async borrarChat(){
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
}

module.exports = ContenedorMensajes;