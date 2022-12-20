import mongoose from "mongoose";

const carritoCollection = "carritos"

const carritoSchema = new mongoose.Schema({
    timeStamp:{type: Number, require: true, max: 100},
    cartProducts:{type: Array}
});

export default mongoose.model(carritoCollection, carritoSchema);