import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    usuario: { type: String },
    senha: { type: String }
},  {versionKey: false});

const usuario = mongoose.model("usuario", usuarioSchema);

export { usuario, usuarioSchema };