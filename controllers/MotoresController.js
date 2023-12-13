const jason = require("jason");
const Motores = require("../models/motores");


const controller = {}

///////////////////////////////////////////////////////////////////////////////////

controller.getRegisterPage = async (req, res) => {
    try {
        res.status(200).render("motores/formMotores", {
            pessoa: new Motores()
        })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}

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
        const motores = await Motores.findAll({})
        console.log(jason(motores))

        await Motores.create({fabricante_motor: fabricante, modelo_motor: modelo, potencia_motor: potencia})
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
    const { pessoaId } = req.params
    const { nome, rua, cidade } = req.body

    try {
        const pessoa = await Pessoa.findByPk(pessoaId)

        if (!pessoa) {
            return res.status(422).render("pages/error", { error: "Usuário não existe!" })
        }

        pessoa.nome = nome
        await pessoa.save()

        const endereco = await Endereco.findOne({
            where: {
                pessoaId: pessoaId
            }
        })

        if (!endereco) {
            return res.status(422).render("pages/error", { error: "Endereço não existe!" })
        }

        endereco.rua = rua
        endereco.cidade = cidade
        await endereco.save()

        res.status(200).redirect(`/pessoas/${pessoa.id}`)
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao atualizar o usuário!" })
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
