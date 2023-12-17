const jason = require("jason");
const Motores = require("../models/motores");
const sequelize = require("sequelize");

const controller = {}

///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de registro
controller.getRegisterPage = async (req, res) => {
    try {
        res.status(200).render("motores/formMotores", {motor: new Motores()})
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de busca
controller.getSearchPage = async (req, res) => {
    const busca = 0
    try {
        res.status(200).render("motores/searchMotores", { motores: new Motores(), busca: busca })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de edição
controller.getUpdatePage = async (req, res) => {
    const {id_motores} = req.params
    try {
        const motor = await Motores.findByPk(id_motores)

        if (!motor) {
            return res.status(422).render("pages/error",{error: "Motor não existe!"})
        }
        console.log(motor)
        const motores = await Motores.findAll()

        res.status(200).render("motores/editMotores",{motor: motor, motores: motores})
    } catch (error) {
        res.status(500).render("pages/error",{error: "Erro ao carregar o formulário!"})
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Cria um novo motor
controller.create = async (req, res) => {

    const { fabricante, modelo, potencia } = req.body

    try {
        const motor = await Motores.findOne({
            where: {

                modelo_motor: modelo
            }
        });
        if (motor) {
            res.status(422).send("Motor já existente no registro existe")
        }      
        
        await Motores.create({fabricante_motor: fabricante, modelo_motor: modelo, potencia_motor: potencia})

        
        const motores = await Motores.findAll({})
        console.log(jason(motores))

        res.status(200).render("motores/indexMotores", {motores: motores})

    } catch (error) {
        res.status(422).send('Ocorreu um erro ao cadastrar o motor' + error)
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Busca todos os motores da lista
controller.getAll = async (req, res) => {
    try {
        const motores = await Motores.findAll({

        })

        res.status(200).render("motores/indexMotores", { motores: motores })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar a página!" })
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Busca todos iguais ao solicitado
controller.search = async (req, res) => {
    const { fabricante, modelo, potencia } = req.body

        try {

            const motores = await Motores.findAll({
                where: {

                    [sequelize.Op.or]: [
                        { fabricante_motor: fabricante },
                        { modelo_motor: modelo },
                        { potencia_motor: potencia}
                    ]
                }
            });

            if (motores.length === 0 || motores[0].fabricante_motor === '' || motores[0].modelo_motor === '' || motores[0].potencia_motor === '') {

                    res.status(422).send("O item procurado não existe no banco de dados")                

            }

            if (!motores) {

                res.status(422).send("O item procurado não existe no banco de dados")

            } else {

                busca = 1
                res.status(200).render("motores/searchMotores", { motores: motores })

            }

        } catch (error) {
            res.status(422).json('Ocorreu um erro ao buscar o item' + error)
    }
}

//////////////////////////////////////////////////////////////////////////////////
//Edita as informações do motor
controller.update = async (req, res) => {
    const { id_motores } = req.params
    const { fabricante, modelo, potencia } = req.body

    try {
        const motor = await Motores.findByPk(id_motores)

        if (!motor) {
            return res.status(422).render("pages/error", { error: "Motor não existe!" })
        }

        if (fabricante) {
            motor.fabricante_motor = fabricante
        }
        if (modelo) {
            motor.modelo_motor = modelo
        }
        if (potencia) {
            motor.potencia_motor = potencia
        }
        await motor.save()

        res.status(200).redirect(`/motores`)
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao atualizar os dados!" })
    }
}

//////////////////////////////////////////////////////////////////////////////////
//Deleta as informações do motor
controller.delete = async (req, res) => {
    const { id_motores } = req.params
    console.log(id_motores)
    try {
        const motor = await Motores.findByPk(id_motores)
        await motor.destroy()
        res.status(200).redirect("/motores")
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao remover o usuário!" })
    }
}
module.exports = controller
