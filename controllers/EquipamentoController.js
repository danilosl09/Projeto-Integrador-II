const Equipamento = require("../models/equipamento");

const controller = {}

controller.getAll = async (req, res) => {
    try {
        const equipamento = await Equipamento.findAll({

        })
        
        res.status(200).render("equipamento/equipamentoIndex",{equipamento: equipamento})
    } catch (error) {
        // console.log(error)
        res.status(500).render("pages/error",{error: "Erro ao carregar a página!"})
    }
}


module.exports = controller