const Motores = require("../models/motores");


const controller = {}

controller.create = async (req, res) =>{

    const {id_motor} = req.params
    const {fabricante, modelo, potencia} = req.body

    try{
        const motores = await Motores.findByPk(id_motor)

        if (!motores){
            res.status(422).send("Motor não existe")
        }

        const motor = await Motores.create(fabricante, modelo, potencia)

        return res.status(200).json(motor)
    }catch(error){
        res.status(422).send('Ocorreu um erro ao cadastrar o motor' + error)
    }
}

controller.getAll = async (req, res) => {
    try {
        const motores = await Motores.findAll({

        })
        
        res.status(200).render("motores/indexMotores",{motores: motores})
    } catch (error) {
        res.status(500).render("pages/error",{error: "Erro ao carregar a página!"})
    }
}

controller.getById = async(req, res) => {

    const {id_motor} = req.params

    try{
        const motores = await Motores.findByPk(id_motor)

        if (!motores){
            res.status(422).send("Motor não existe no banco de dados")
        }

        return res.status(200).json(motores)
    }catch(error){
        res.status(422).json('Ocorreu um erro ao buscar o item' + error)
    }
}

module.exports = controller
