import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    email:{type: String, require: true, max: 100},
    password:{type: Number, require: true}
});

export const usuarios = mongoose.model( "usuarios", usuariosSchema);
