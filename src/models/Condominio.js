import mongoose from "mongoose";
import morador from "./Morador.js";
import {pedido} from "./Pedido.js";

const condominioSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String },
    cnpj: { type: String},
    logradouro: { type: String},
    numero: { type: String},
    complemento: { type: String},
    bairro: { type: String},
    estado: { type: String},
    municipio: { type: String},
    cep: { type: String},
    nome_adm: { type: String},
    cpf_adm: { type: String},
    email_adm: { type: String},
    celular_adm: { type: String},
    senha_adm: { type: String},
    moradores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'morador'}]
}, {versionKey: false});

const condominio = mongoose.model("condominio", condominioSchema);

export default condominio; //{ condominio, condominioSchema };