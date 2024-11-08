import app from "./app.js"; // Importa a configuração do app do Express

// Definindo a porta. Vercel usa automaticamente a variável de ambiente PORT.
const PORT = process.env.PORT || 3000;

// Inicializando o servidor na porta correta
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});