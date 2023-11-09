const Dados = require("../models/dados");
const Equipamento = require("../models/equipamento");
const Motores = require("../models/motores");
const Sensores = require("../models/sensores");
const Setor = require("../models/setor");
const Tipo_de_Dado = require("../models/tipo_de_dado");
const Tipo_Sensor = require("../models/tipo_sensor");
const db = require("../config/dbconnection")

//Setor tem muitos Equipamentos
Setor.hasMany(Equipamento,{onDelete: "CASCADE"})
//Equipamento pertwnce a um setor
Equipamento.belongsTo(Setor, {foreingKey: "id_setor"})

//Equipamento tem muitos Sensores
Equipamento.hasMany(Sensores,{onDelete: "CASCADE"})
//Sensores pertence a um Equipamento
Sensores.belongsTo(Equipamento, {foreingKey: "id_equipamento"})

//Tipo_Sensor tem muitos Sensores 
Tipo_Sensor.hasMany(Sensores,{onDelete: "CASCADE"})
//Sensores pertence a um Tipo_Sensor
Sensores.belongsTo(Tipo_Sensor, {foreingKey: "id_tipo_sensor"})

//Sensores tem muitos Dados
Sensores.hasMany(Dados,{onDelete: "CASCADE"})
//Dados pertence a um Sensores
Dados.belongsTo(Dados, {foreingKey:"id_sensores"})

//Tipo_de_Dado tem muitos Dados
Tipo_de_Dado.hasMany(Dados, {onDelete: "CASCADE"})
//Dados pertence a um tipo de Dado
Dados.belongsTo(Tipo_de_Dado, {foreingKey: "id_tipo_de_dado"})

//Equipamento tem muitos Motores entre Equipamento_has_Motores
Equipamento.belongsToMany(Motores, {through: "Equipamento_has_Motores", onDelete: "CASCADE"})
//Motores tem muitos Equipamentos entre Equipamento_has_Motores
Motores.belongsToMany(Equipamento, {through: "Equipamento_has_Motores", onDelete: "CASCADE"})


db.sync()

module.exports = {Dados, Equipamento, Motores, Sensores, Setor, Tipo_de_Dado, Tipo_Sensor}