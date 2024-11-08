import morador from "../models/Morador.js";
import condominioRepo from "../models/Condominio.js"

class MoradorController {

    static async listarMoradorPorId(req, res) {
        try {
            const id = req.params.id;
            const moradorEncontrado = await morador.findById(id).populate("pedidos");

            if(!moradorEncontrado){
                return res.status(400).json("Morador não encontrado");
            }

            res.status(200).json(moradorEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao listar morador por id`});
        }
    }
    
    static async cadastrarMorador(req, res){
        try {
            const novoMorador = await morador.create(req.body);
            const condominioId = String(req.query.condominioId);
            VincularMoradorAoCondominio(novoMorador, condominioId, res);
        } 
        catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar morador`});
        }
    }

    static async atualizarMorador(req, res){
        try {
            const id = req.params.id;
            var moradorAtualizado = await morador.findByIdAndUpdate(id, req.body);

            if(!moradorAtualizado){
                return res.status(400).json("Morador não encontrado");
            }
            
            res.status(200).json("Morador atualizado");
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao atualizar morador`});
        }
    };

    static async excluirMorador(req, res){
        try {
            const id = req.params.id;
            await morador.findByIdAndDelete(id);
            res.status(200).json({ message: "Morador excluido" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao excluir morador`});
        }
    };
};

async function VincularMoradorAoCondominio(morador, condominioId, res) {
    
    const condominioAtualizado = await condominioRepo.findByIdAndUpdate(
        condominioId,
        { $push: { moradores: morador._id } }, // Utilizando $push para adicionar o morador ao array
        { new: true } // Retorna o documento atualizado
    );

    if (!condominioAtualizado) {
        return res.status(400).json({ message: "Condomínio não encontrado" });
    }

    return res.status(201).json({morador: morador});
}

export default MoradorController;