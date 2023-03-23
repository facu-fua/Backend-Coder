import mongoose from "mongoose";

const productoCollection = "productos"

const productoSchema = new mongoose.Schema({
    name:{type: String, require: true, max: 30},
    price:{type: Number, require: true},
    description:{type: String, require: false, max: 100},
    stock:{type: Number, require: true, max: 100},
    thumbnail:{type: String, require:false},
});

export default mongoose.model(productoCollection, productoSchema)