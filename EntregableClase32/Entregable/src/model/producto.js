import mongoose from "mongoose";

const productoCollection = "productos"

const productoSchema = new mongoose.Schema({
    timeStamp:{type: Number, require: true, max: 100},
    title:{type: String, require: true, max: 30},
    description:{type: String, require: false, max: 100},
    code:{type: String, require: true, max: 10},
    price:{type: Number, require: true},
    thumbnail:{type: String, require:false},
    quantity:{type: Number, require: true, max: 3},
});

export default mongoose.model(productoCollection, productoSchema)