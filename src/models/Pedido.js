import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    plataforma: { type: String },
    descricao: { type: String },
    previsao_chegada: { type: String },
    local_entrega: { type: String },
    status: { type: String}
},  {versionKey: false});

const pedido = mongoose.model("pedido", pedidoSchema);

export { pedido, pedidoSchema };