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
        res.status(500).render('pages/error', { error: "Erro ao carregar a página!" })
    }
});

//Requisição de dados
routes.get('/indexDados', (req, res) => {
    try {
        res.status(200).render('dados/indexDados');
    } catch (error) {
        res.status(500).render('pages/error', { error: "Erro ao carregar a página!" })
    }
});
routes.get('/dados', DadosController.getAll);
routes.post('/filtraDados/:idSensores/:dataInicial/:horaInicial/:dataFinal/:horaFinal', DadosController.getById);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Controle Equipamentos
routes.get("/equipamento/:id_setor/update", EquipamentoController.getUpdatePage)
routes.get('/equipamento', EquipamentoController.getAll);
routes.get('/equipamentoBusca/', EquipamentoController.getSearchPage);
routes.post('/equipamentoSearch/:tagEquipamento/:idSetorEquipamento', EquipamentoController.search);
routes.get('/equipamentoNovo', EquipamentoController.getRegisterPage);
routes.post('/equipamentoNovo/:tagEquipamento/:idSetorEquipamento', EquipamentoController.create);
routes.put('/equipamento/:id_equipamentor', EquipamentoController.update);
routes.delete('/equipamento/:id_equipamento', EquipamentoController.delete);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Controle Motores
routes.get("/motores/:id_motores/update", MotoresController.getUpdatePage); //Funcionou OK
routes.get('/motores', MotoresController.getAll); //Funcionou OK
routes.get('/motoresBusca', MotoresController.getSearchPage);
routes.post('/motoresSearch/:fabricante/:modelo/:potencia', MotoresController.search);
routes.get('/motoresNovo', MotoresController.getRegisterPage); //Funcionou OK
routes.post('/motoresNovo/:fabricante/:modelo/:potencia', MotoresController.create); //Funcionou OK
routes.put('/motores/:id_motores', MotoresController.update);
routes.delete('/motores/:id_motores', MotoresController.delete); //Funcionou OK
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Controle Sensores
routes.get("/sensores/:id_tipo_sensor/update", SensoresController.getUpdatePage)
routes.get('/sensores', SensoresController.getAll); //Funcionou OK
routes.get('/sensoresBusca/', SensoresController.getSearchPage); //Funcionou OK
routes.post('/sensoresSearch/:fabricanteSensor/:modeloSensor/:tipoSensor', SensoresController.search); //Funcionou OK
routes.get('/sensoresNovo', SensoresController.getRegisterPage); //Funcionou OK
routes.post('/sensoresNovo/:fabricanteSensor/:modeloSensor/:tipoSensor', SetorController.create); //Funcionou OK
routes.put('/sensores/:id_tipo_sensor', SensoresController.update);
routes.delete('/sensores/:id_tipo_sensor', SensoresController.delete); //Funcionou OK
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Controle Setor
routes.get("/setor/:id_setor/update", SetorController.getUpdatePage)
routes.get('/setor', SetorController.getAll);
routes.get('/setorBusca/', SetorController.getSearchPage);
routes.post('/setorSearch/:nomeSetor/:linhaSetor', SetorController.search);
routes.get('/setorNovo', SetorController.getRegisterPage);
routes.post('/setorNovo/:nomeSetor/:linhaSetor', SetorController.create);
routes.put('/setor/:id_setor', SetorController.update);
routes.delete('/setor/:id_setor', SetorController.delete);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = routes;