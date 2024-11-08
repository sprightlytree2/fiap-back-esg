import condominioRepo from "../models/Condominio.js";
import moradorRepo from "../models/Morador.js";

class LoginController{
    static async realizarLogin(req, res) {
        try {
            const email = req.body.email;
            const senha = req.body.senha;

            var resposta = await ProcuraMorador(email, senha);

            if(resposta.codigo == 200){
                return res.status(200).json({ id_usuario: resposta.usuario._id, tipo_usuario: resposta.tipo_usuario, nome_usuario: resposta.usuario.nome});
            }

            resposta = await ProcurarCondominio(email, senha);

            if(resposta.codigo == 200){
                return res.status(200).json({ id_usuario: resposta.usuario._id, tipo_usuario: resposta.tipo_usuario, nome_usuario: resposta.usuario.nome_adm});
            }

            return res.status(400).json("Usuario e/ou senha invalidos");

        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao listar condominio por id`});
        }
    }
}

async function ProcuraMorador(email, senha) {
    const moradorEncontrado = await moradorRepo.find({ $and: [{email: email}, {senha: senha}] });

    if(moradorEncontrado.length == 0){
        return { codigo: 400 }
    }

    return { codigo: 200, usuario: moradorEncontrado[0], tipo_usuario: "morador"};
}

async function ProcurarCondominio(email, senha) {
    const condominioEncontrado = await condominioRepo.find({ $and: [{email_adm: email}, {senha_adm: senha}] });

    if(condominioEncontrado.length == 0){
        return { codigo: 400 }
    }

    return { codigo: 200, usuario: condominioEncontrado[0], tipo_usuario: "condominio"};
}


export default LoginController;