const Dados = require("../models/dados");

const controller = {}

controller.getAll = async (req, res) => {
    try {
        // const dados = await Dados.findAll({

        // })
        
        res.status(200).render("dados/indexDados")
    } catch (error) {
        res.status(500).render("pages/error",{error: "Erro ao carregar a página!"})
    }
}

module.exports = controller