const fs = require('fs');

class ContenedorCarrito {

    constructor(ruta) {
        this.ruta = ruta;
    }
    //tiene que haber una variable donde se guarden los carritos


    //esto podria recibir una array de productos y luego meterlos dentro de cartProducts
    async getCartProductos(id) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            console.log(id)
            const cart = array.find(ele => ele.id == id);
            console.log(cart)
            return (cart.cartProducts)
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    }

    async postCart() {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            let idMax = 0
            array.forEach((element) => {
                if (element.id > idMax) {
                    idMax = element.id;
                }
            })
            const id = idMax + 1;
            const nuevoCarrito = {
                id: id,
                timestamp: Date.now(),
                cartProducts: []
            }
            array.push(nuevoCarrito)
            await fs.promises.writeFile(this.ruta, JSON.stringify(array, null, 2), error => {
                console.log(error)
            })
            return (id)
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    };

    //como crear producto? en el server? ver como se recibe desde el formulario websockets
    async postIdProduct(idCarrito, idProducto) {
        try {
            const arrayCarrito = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            const arrayProductos = JSON.parse(await fs.promises.readFile('../productos.txt', "utf-8"))
            const cart = arrayCarrito.find(carrito => {
                carrito.id == idCarrito
            });
            const producto = arrayProductos.find(ele => ele.id == idProducto)
            cart.cartProducts.push(producto);
            return (producto)
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    };

    async removeCart(id) { //seria removeCarrito esta operacion
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"))
            const nuevoArray = array.filter(ele => ele.id != id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoArray, null, 2), error => {
                console.log(error)
            })
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    };

    async removeProduct(idProducto, idCarrito) {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            const cart = array.find(ele => ele.id == idCarrito);
            const newProductList = cart.cartProducts.filter(element => {
                element.id != idProducto
            });
            cart.cartProducts = newProductList;
        } catch (error) {
            console.log("Hubo un error!", error)
        }
    };

    async getCarritos() {
        try {
            const array = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
            return array
        } catch (error) {
            console.log("Hubo un error!", error);
        }
    }
}

module.exports = ContenedorCarrito;