import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    name:{type: String, require: true, max: 100},
    adress:{type: String, require: true, max: 100},
    age:{type: Number, require: true, max: 3},
    email:{type: String, require: true, max: 100},
    phone:{type: Number, require: true, max: 100},
    picture:{type: Image, require: true},
    password:{type: String, require: true, max: 20}
});

export const usuarios = mongoose.model( "usuarios", usuariosSchema);
