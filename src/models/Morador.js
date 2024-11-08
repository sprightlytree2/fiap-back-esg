import mongoose from "mongoose";

const moradorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String },
    cpf: { type: String },
    celular: { type: String },
    email: { type: String },
    data_nascimento: { type: String },
    unidade: { type: String },
    eh_entregador: { type: Boolean, default: false },
    senha: { type: String },
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pedido'}]
},  {versionKey: false, collection: "moradors"});

const morador = mongoose.model("morador", moradorSchema);

export default morador;