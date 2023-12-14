const express = require('express');
const DadosController = require('../controllers/DadosController');
const EquipamentoController = require('../controllers/EquipamentoController');
const MotoresController = require('../controllers/MotoresController');
const SensoresController = require('../controllers/SensoresController');    
const SetorController = require('../controllers/SetorController');

const routes = express.Router();

//Pagina inicial
routes.get('/', (req, res) => {
    try {
        res.status(200).render('pages/index');
    } catch (error) {
    res.status(500).render('pages/error', {error: "Erro ao carregar a página!"})
}
});

//Requisição de dados
routes.get('/dados', DadosController.getAll);
routes.post('/filtraDados/:dataInicial/:horaInicial/:dataFinal/:horaFinal', DadosController.getById);

//Controle Equipamentos
routes.get('/equipamentos', EquipamentoController.getAll);
//routes.get('/equipamentos/:id', EquipamentoController.getById);
//routes.post('/equipamentos', EquipamentoController.create);
//routes.put('/equipamentos/:id', EquipamentoController.update);
//routes.delete('/equipamentos/:id', EquipamentoController.delete);

//Controle Motores
routes.get("/motores/:id_motores/update",MotoresController.getUpdatePage)

routes.get('/motores', MotoresController.getAll); //Funcionou OK
routes.get('/motores/:id', MotoresController.getById);
routes.get('/motoresNovo', MotoresController.getRegisterPage); //Funcionou OK
routes.post('/motoresNovo/:fabricante/:modelo/:potencia', MotoresController.create); //Funcionou OK
routes.put('/motores/:id_motores', MotoresController.update);
routes.delete('/motores/:id_motores', MotoresController.delete); //Funcionou OK

//Controle Sensores
//routes.get('/sensores', SensoresController.getAll);
//routes.get('/sensores/:id', SensoresController.getById);

//Controle Setor
routes.get('/setor', SetorController.getAll);
//routes.get('/setor/:id', SetorController.getById);
//routes.post('/setor', SetorController.create);
//routes.put('/setor/:id', SetorController.update);
//routes.delete('/setor/:id', SetorController.delete);

module.exports = routes;