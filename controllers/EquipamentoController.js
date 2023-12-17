const Equipamento = require("../models/equipamento");
const jason = require("jason");
const sequelize = require("sequelize");

const controller = {}

///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de registro
controller.getRegisterPage = async (req, res) => {
    try {
        res.status(200).render("equipamento/formEquipamento", { equipamento: new Equipamento() })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de busca
controller.getSearchPage = async (req, res) => {
    const busca = 0
    try {
        res.status(200).render("equipamento/searchEquipamento", { equipamento: new Equipamento(), busca: busca })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Auxiliar para página de edição
controller.getUpdatePage = async (req, res) => {
    const { id_equipamento } = req.params

    console.log(id_equipamento + " aqui chega o id do equipamento e verifica se existe")

    try {
        const equipamento1 = await Equipamento.findByPk(id_equipamento)

        if (!equipamento1) {
            return res.status(422).render("pages/error", { error: "equipamento não existe!" })
        }
        console.log(equipamento1)
        // const equipamento = await equipamento.findAll()
        // console.log(equipamento[2].nome_equipamento + " aqui faz a busca na tabela equipamento")
        res.status(200).render("equipamento/editEquipamento", { equipamento1: equipamento1 })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Cria um novo equipamento
controller.create = async (req, res) => {

    const { tagEquipamento, idSetorEquipamento } = req.body
    console.log(tagEquipamento, idSetorEquipamento  + " aqui chega as informações da requisição")

    try {
        const equipamento = await Equipamento.findOne({
            where: {

                tag_equipamento: tagEquipamento
            }
        });

        console.log(equipamento)

        if (equipamento) {
            res.status(422).send("modelo de sensor já existente no registro")
        } else {
            await Equipamento.create({ tag_equipamento: tagEquipamento, id_setor: idSetorEquipamento  })
        };

        const equipamento1 = await Equipamento.findAll({})
        console.log(jason(equipamento1))

        res.status(200).render("equipamento/indexEquipamento", { equipamento: equipamento1 })

    } catch (error) {
        res.status(422).send('Ocorreu um erro ao cadastrar o equipamento' + error)
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Busca todos os equipamentoes da lista
controller.getAll = async (req, res) => {
    try {
        const equipamento = await Equipamento.findAll({

        })

        res.status(200).render("equipamento/indexEquipamento", { equipamento: equipamento })
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar a página!" })
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Busca todos iguais ao solicitado
controller.search = async (req, res) => {
    const { tagEquipamento, idSetorEquipamento } = req.body

        try {

            const equipamento = await Equipamento.findAll({
                where: {

                    [sequelize.Op.or]: [
                        { tag_equipamento: tagEquipamento },
                        { id_setor: idSetorEquipamento }
                    ]
                }
            });
            console.log(equipamento.tag_equipamento)

            if (equipamento.length === 0 || equipamento[0].tag_equipamento === '' || equipamento[0].id_setor === '') {

                    res.status(422).send("O item procurado não existe no banco de dados")                

            }

            if (!equipamento) {

                res.status(422).send("O item procurado não existe no banco de dados")

            } else {

                busca = 1
                res.status(200).render("equipamento/searchEquipamento", { equipamento: equipamento })

            }

        } catch (error) {
            res.status(422).json('Ocorreu um erro ao buscar o item' + error)
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Edita as informações do equipamento
controller.update = async (req, res) => {
    const { id_equipamento } = req.params
    const { tagEquipamento, idSetorEquipamento } = req.body

    try {
        const equipamento = await Equipamento.findByPk(id_equipamento)

        if (!equipamento) {
            return res.status(422).render("pages/error", { error: "equipamento não existe!" })
        }

        if (tagEquipamento) {
            equipamento.tag_equipamento = tagEquipamento
        }
        if (idSetorEquipamento) {
            equipamento.id_setor = idSetorEquipamento
        }
        await equipamento.save()

        res.status(200).redirect(`/equipamento`)
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao atualizar os dados!" })
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Deleta as informações do equipamento
controller.delete = async (req, res) => {
    const { id_equipamento } = req.params
    console.log(id_equipamento)
    try {
        const equipamento = await Equipamento.findByPk(id_equipamento)
        await equipamento.destroy()
        res.status(200).redirect("/equipamento")
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao remover equipamento!" })
    }
}
module.exports = controller