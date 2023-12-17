const Setor = require("../models/setor");
const jason = require("jason");
const sequelize = require("sequelize");

const controller = {}

///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de registro
controller.getRegisterPage = async (req, res) => {
    try {
        res.status(200).render("setor/formSetor", { setor: new Setor() })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de busca
controller.getSearchPage = async (req, res) => {
    const busca = 0
    try {
        res.status(200).render("setor/searchSetor", { setor: new Setor(), busca: busca })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de edição
controller.getUpdatePage = async (req, res) => {
    const { id_setor } = req.params

    console.log(id_setor + " aqui chega o id do setor e verifica se existe")

    try {
        const setor1 = await Setor.findByPk(id_setor)

        if (!setor1) {
            return res.status(422).render("pages/error", { error: "Setor não existe!" })
        }
        console.log(setor1)
        // const setor = await Setor.findAll()
        // console.log(setor[2].nome_setor + " aqui faz a busca na tabela setor")
        res.status(200).render("setor/editSetor", { setor1: setor1 })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Cria um novo setor
controller.create = async (req, res) => {

    const { nomeSetor, linhaSetor } = req.body
    console.log(nomeSetor, linhaSetor + " aqui chega as informações da requisição")

    try {
        const setor1 = await Setor.findOne({
            where: {

                linha_setor: linhaSetor
            }
        });

        console.log(setor1)

        if (setor1) {
            res.status(422).send("linha já existente no registro")
        } else {
            await Setor.create({ nome_setor: nomeSetor, linha_setor: linhaSetor })
        };

        const setor = await Setor.findAll({})
        console.log(jason(setor))

        res.status(200).render("setor/indexSetor", { setor: setor })

    } catch (error) {
        res.status(422).send('Ocorreu um erro ao cadastrar o motor' + error)
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Busca todos os setores da lista
controller.getAll = async (req, res) => {
    try {
        const setor = await Setor.findAll({

        })

        res.status(200).render("setor/indexSetor", { setor: setor })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar a página!" })
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Busca todos iguais ao solicitado
controller.search = async (req, res) => {
    const { nomeSetor, linhaSetor } = req.body

        try {

            const setor = await Setor.findAll({
                where: {

                    [sequelize.Op.or]: [
                        { nome_setor: nomeSetor },
                        { linha_setor: linhaSetor }
                    ]
                }
            });
            console.log(setor.nome_setor)

            if (setor.length === 0 || setor[0].nome_setor === '' || setor[0].linha_setor === '') {

                    res.status(422).send("O item procurado não existe no banco de dados")                

            }

            if (!setor) {

                res.status(422).send("O item procurado não existe no banco de dados")

            } else {

                busca = 1
                res.status(200).render("setor/searchSetor", { setor: setor })

            }

        } catch (error) {
            res.status(422).json('Ocorreu um erro ao buscar o item' + error)
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Edita as informações do setor
controller.update = async (req, res) => {
    const { id_setor } = req.params
    const { nomeSetor, linhaSetor } = req.body

    try {
        const setor = await Setor.findByPk(id_setor)

        if (!setor) {
            return res.status(422).render("pages/error", { error: "Setor não existe!" })
        }

        if (nomeSetor) {
            setor.nome_setor = nomeSetor
        }
        if (linhaSetor) {
            setor.linha_setor = linhaSetor
        }
        await setor.save()

        res.status(200).redirect(`/setor`)
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao atualizar os dados!" })
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Deleta as informações do setor
controller.delete = async (req, res) => {
    const { id_setor } = req.params
    console.log(id_setor)
    try {
        const setor = await Setor.findByPk(id_setor)
        await setor.destroy()
        res.status(200).redirect("/setor")
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao remover setor!" })
    }
}
module.exports = controller