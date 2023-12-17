const Sensores = require("../models/sensores");
const Tipo_Sensor = require("../models/tipo_sensor");
const jason = require("jason");
const sequelize = require("sequelize");

const controller = {}

///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de registro
controller.getRegisterPage = async (req, res) => {
    try {
        res.status(200).render("sensores/formSensores", { tipo_sensor: new Tipo_Sensor() })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de busca
controller.getSearchPage = async (req, res) => {
    const busca = 0
    try {
        res.status(200).render("sensores/searchSensores", { tipo_sensor: new Tipo_Sensor(), busca: busca })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de edição
controller.getUpdatePage = async (req, res) => {
    const { id_tipo_sensor } = req.params

    console.log(id_tipo_sensor + " aqui chega o id do sensor e verifica se existe")

    try {
        const tipo_sensor = await Tipo_Sensor.findByPk(id_tipo_sensor)

        if (!tipo_sensor) {
            return res.status(422).render("pages/error", { error: "Sensor não existe!" })
        }
        console.log(tipo_sensor)
        res.status(200).render("sensores/editSensores", { tipo_sensor: tipo_sensor })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Cria um novo setor
controller.create = async (req, res) => {

    const { fabricante, modeloSensor, tipoSensor } = req.body
    console.log(fabricante, modeloSensor, tipoSensor + " aqui chega as informações da requisição")

    try {
        const tipo_sensor1 = await Tipo_Sensor.findOne({
            where: {

                modelo_sensor: modeloSensor
            }
        });

        console.log(tipo_sensor1)

        if (tipo_sensor1) {
            res.status(422).send("linha já existente no registro")
        } else {
            await Tipo_Sensor.create({ fabricante: fabricante, modelo_sensor: modeloSensor, tipo_sensor: tipoSensor })
        };

        const tipo_sensor = await Tipo_Sensor.findAll({})
        console.log(jason(setor))

        res.status(200).render("sensores/indexSensores", { tipo_sensor: tipo_sensor })

    } catch (error) {
        res.status(422).send('Ocorreu um erro ao cadastrar o motor' + error)
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Busca todos os setores da lista
controller.getAll = async (req, res) => {
    try {
        const tipo_sensor = await Tipo_Sensor.findAll({

        })

        res.status(200).render("sensores/indexSensores", { tipo_sensor: tipo_sensor })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar a página!" })
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Busca todos iguais ao solicitado
controller.search = async (req, res) => {
    const { fabricanteSensor, modeloSensor, tipoSensor } = req.body

    console.log(fabricanteSensor + " aqui chega as informações da requisição")

    try {

        const tipo_sensor = await Tipo_Sensor.findAll({
            where: {

                [sequelize.Op.or]: [
                    { fabricante: fabricanteSensor },
                    { modelo_sensor: modeloSensor },
                    { tipo_sensor: tipoSensor }
                ]
            }
        });
        console.log(tipo_sensor.modelo_sensor)

        if (tipo_sensor.length === 0 || tipo_sensor[0].fabricanteSensor === '' || tipo_sensor[0].modelo_sensor === '' || tipo_sensor[0].tipo_sensor === '') {

            res.status(422).send("O item procurado não existe no banco de dados")

        }

        if (!tipo_sensor) {

            res.status(422).send("O item procurado não existe no banco de dados")

        } else {

            busca = 1
            res.status(200).render("sensores/searchSensores", { tipo_sensor: tipo_sensor })

        }

    } catch (error) {
        res.status(422).json('Ocorreu um erro ao buscar o item ' + error)
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Edita as informações do setor
controller.update = async (req, res) => {
    const { id_tipo_sensor } = req.params
    const { fabricante, modeloSensor, tipoSensor } = req.body

    try {
        const tipo_sensor = await Tipo_Sensor.findByPk(id_tipo_sensor)

        if (!tipo_sensor) {
            return res.status(422).render("pages/error", { error: "Sensor não existe na lista!" })
        }

        if (fabricante) {
            tipo_sensor.fabricante = fabricante
        }

        if (modeloSensor) {
            tipo_sensor.modelo_sensor = modeloSensor
        }
        if (tipoSensor) {
            tipo_sensor.tipo_sensor = tipoSensor
        }
        await tipo_sensor.save()

        res.status(200).redirect(`/sensores`)
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao atualizar os dados!" })
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Deleta as informações do setor
controller.delete = async (req, res) => {
    const { id_tipo_sensor } = req.params
    console.log(id_tipo_sensor)

    try {
        const tipo_sensor = await Tipo_Sensor.findByPk(id_tipo_sensor)
        await tipo_sensor.destroy()
        res.status(200).redirect("/sensores")
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao remover sensor!" })
    }
}
module.exports = controller