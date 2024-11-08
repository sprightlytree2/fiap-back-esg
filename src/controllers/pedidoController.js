import { pedido } from "../models/Pedido.js";
import  moradorRepo from "../models/Morador.js";

class PedidoController {

    static async listarPedidos(req, res) {
        try {
            const pedidosEncontrados = await pedido.find({});
            res.status(200).json(pedidosEncontrados);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao listar pedido por id`});
        }
    }

    static async listarPedidoPorId(req, res) {
        try {
            const id = req.params.id;
            const pedidoEncontrado = await pedido.findById(id);

            if(!pedidoEncontrado){
                return res.status(400).json("Pedido não encontrado");
            }

            res.status(200).json(pedidoEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao listar pedido por id`});
        }
    }
    
    static async cadastrarPedido(req, res){
        try {
            var pedidoParaCadastrar = req.body;
            pedidoParaCadastrar.status = "Aguardando chegada";
            const novoPedido = await pedido.create(pedidoParaCadastrar);
            const moradorId = String(req.query.moradorId);
            VincularPedidoAoCondominio(novoPedido, moradorId, res);
        } 
        catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar pedido`});
        }
    }

    static async atualizarPedido(req, res){
        try {
            const id = req.params.id;
            const pedidoAtualizado = await pedido.findByIdAndUpdate(id, req.body);

            if(!pedidoAtualizado){
                return res.status(400).json("Pedido não encontrado");
            }

            res.status(200).json("Pedido atualizado");
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar pedido`});
        }
    };

    static async excluirPedido(req, res){
        try {
            const id = req.params.id;
            await pedido.findByIdAndDelete(id);
            res.status(200).json("Pedido excluido");
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir pedido`});
        }
    };
};

async function VincularPedidoAoCondominio(pedido, moradorId, res) {
    
    const moradorAtualizado = await moradorRepo.findByIdAndUpdate(
        moradorId,
        { $push: { pedidos: pedido._id } }, // Utilizando $push para adicionar o morador ao array
        { new: true } // Retorna o documento atualizado
    );

    if (!moradorAtualizado) {
        return res.status(400).json({ message: "Morador não encontrado" });
    }

    return res.status(201).json({ pedido: pedido });
}

export default PedidoController;