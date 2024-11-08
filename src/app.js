import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import condominiosRoutes from "./routes/condominiosRoutes.js"; // Importando rotas de condomínios
import moradoresRoutes from "./routes/moradoresRoutes.js"; // Importando rotas de moradores
import pedidosRoutes from "./routes/pedidosRoutes.js"; // Importando rotas de pedidos
import loginRoutes from "./routes/loginRoutes.js";
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
app.use(condominiosRoutes); // Usando as rotas de condomínios
app.use(moradoresRoutes); // Usando as rotas de moradores
app.use(pedidosRoutes); // Usando as rotas de pedidos
app.use(loginRoutes);

export default app;