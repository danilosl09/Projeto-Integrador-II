const Setor = require("../models/setor");

const controller = {}

controller.getAll = async (req, res) => {
    try {
        const setor = await Setor.findAll({

        })
        
        res.status(200).render("setor/indexSetor",{setor: setor})
    } catch (error) {
        res.status(500).render("pages/error",{error: "Erro ao carregar a página!"})
    }
}


controller.create = async (req, res) =>{

    const {nome_setor} = req.params
    const {ome_setor, linha_setor} = req.body

    try{
        const setor = await Setor.findByPk(nome_setor)

        if (!setor){
            res.status(422).send("Motor não existe")
        }

        const setor1 = await Setor.create(nome_setor, linha_setor)

        return res.status(200).json(setor1)
    }catch(error){
        res.status(422).send('Ocorreu um erro ao cadastrar o motor' + error)
    }
}


module.exports = controller