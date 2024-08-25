// Importando as dependências do projeto
const express = require("express");
const routes = express.Router();

// Referencia o Controllers
const AuthController = require('./controllers/AuthController');
const VeiculosController = require("./controllers/VeiculosController");
const authMiddleware = require('./middleware/auth');

// associa as rotas ao seu método do Controller
routes.get("/avisos", authMiddleware, VeiculosController.index);
routes.get("/avisos/filtra/", authMiddleware, VeiculosController.filtra);
routes.post("/avisos", authMiddleware, VeiculosController.store);

routes.post('/login', AuthController.login);
module.exports = routes;
