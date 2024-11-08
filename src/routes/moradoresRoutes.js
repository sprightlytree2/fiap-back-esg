import express from "express";
import MoradorController from "../controllers/moradorController.js";

const routes = express.Router();

routes.get("/moradores/:id", MoradorController.listarMoradorPorId);
routes.post("/moradores", MoradorController.cadastrarMorador);
routes.put("/moradores/:id", MoradorController.atualizarMorador);
routes.delete("/moradores/:id", MoradorController.excluirMorador);

export default routes;