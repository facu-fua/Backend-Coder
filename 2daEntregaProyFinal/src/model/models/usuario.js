import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    name:{type: String, require: true, max: 100},
    adress:{type: String, require: true, max: 100},
    age:{type: Number, require: true, max: 100},
    email:{type: String, require: true, max: 100},
    phone:{type: Number, require: true, max: 100},
    picture:{type: String, require: true},
    password:{type: String, require: true, max: 20}
});

export default mongoose.model( "usuarios", usuarioSchema);
