const jason = require("jason");
const Motores = require("../models/motores");


const controller = {}

///////////////////////////////////////////////////////////////////////////////////

controller.getRegisterPage = async (req, res) => {
    try {
        res.status(200).render("motores/formMotores", {motor: new Motores()})
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
//*********************************************** */
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
//********************************************** */
///////////////////////////////////////////////////////////////////////////////////
//Cria um novo motor
controller.create = async (req, res) => {

    const { fabricante, modelo, potencia } = req.body
    console.log(fabricante, modelo, potencia)

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
controller.getById = async (req, res) => {

    const { modelo } = req.params

    try {    

    const motor = await Motores.findOne({
        where: {
            modelo_motor: modelo
        }
    });

    if (!motor) {
        res.status(422).send("Motor não existe no banco de dados")
    }

    const motores = await Motores.findAll({
        where: {
            modelo_motor: modelo
        }
    })      
        return res.status(200).json(motores)
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
