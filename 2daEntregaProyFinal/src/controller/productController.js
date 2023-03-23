import productoSchema from "../model/models/producto.js";

const productPost = async (product) =>{
    const producto = productoSchema(product);
    try {
        const data = await producto.save();
        console.log("Producto agregado con exito ", data)
    } catch (error) {
        console.log("Hubo un error ", error);
    }
}

const productPut = async (product, id) => {
    try {
        const {name, price, description, stock, thumbnail} = product;
        const producto = await productoSchema.updateOne({_id: id}, { $set: {name, price, description, stock, thumbnail}});
        console.log(producto)
    } catch (error) {
        console.log("Hubo un error al intentar actualizar el producto: ", error)
    }
}

export default {productPost, productPut};