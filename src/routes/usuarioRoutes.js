import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const routes = express.Router();

routes.post("/usuarios", UsuarioController.cadastrarUsuario);
routes.post("/usuarios/login", UsuarioController.realizarLogin);

export default routes;