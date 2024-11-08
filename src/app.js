import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

// Criando a instância do app Express
const app = express();

// Conectando ao banco de dados
const conexao = await conectaNaDataBase();
conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
});

// Middleware para tratar requisições com JSON
app.use(express.json());
app.use(cors());

// Registrando as rotas
app.use(usuarioRoutes);

export default app;