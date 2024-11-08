import { usuario } from "../models/Usuario.js";

class UsuarioController {

    static async realizarLogin(req, res) {
        try {
            const usuarioFornecido = req.body.usuario;
            const senhaFornecida = req.body.senha;

            const usuarioEncontrado = await usuario.find({ $and: [{usuario: usuarioFornecido}, {senha: senhaFornecida}] });

            if(usuarioEncontrado.length == 0){
                return res.status(400).json("Usuario e/ou senha invalidos");
            }
        
            res.status(200).json({usuario: usuarioEncontrado});
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha realizar login`});
        }
    }
    
    static async cadastrarUsuario(req, res){
        try {
            var usuarioParaCadastrar = req.body;
            const usuarioCadastrado = await usuario.create(usuarioParaCadastrar);
            return res.status(200).json({usuario: usuarioCadastrado})
        } 
        catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar usuario`});
        }
    }
};

export default UsuarioController;