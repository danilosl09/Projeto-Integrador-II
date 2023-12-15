const Setor = require("../models/setor");
const jason = require("jason");

const controller = {}


///////////////////////////////////////////////////////////////////////////////////////
// controller.getAll = async (req, res) => {
//     try {
//         const setor = await Setor.findAll({

//         })
        
//         res.status(200).render("setor/indexSetor",{setor: setor})
//     } catch (error) {
//         res.status(500).render("pages/error",{error: "Erro ao carregar a página!"})
//     }
// }


// controller.create = async (req, res) =>{

//     const {nome_setor, linha_setor} = req.body.params

//     try{
//         const setor = await Setor.findByPk(nome_setor)

//         if (!setor){
//             res.status(422).send("Motor não existe")
//         }

//         const setor1 = await Setor.create(nome_setor, linha_setor)

//         return res.status(200).json(setor1)
//     }catch(error){
//         res.status(422).send('Ocorreu um erro ao cadastrar o motor' + error)
//     }
// }

/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// ????????
controller.getRegisterPage = async (req, res) => {
    try {
        res.status(200).render("setor/formSetor", {setor: new Setor()})
    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário!" })
    }
}
///////////////////////////////////////////////////////////////////////////////////
// ????????
controller.getUpdatePage = async (req, res) => {
    const {id_setor} = req.params
    try {
        const setor1 = await Setor.findByPk(id_setor)

        if (!setor1) {
            return res.status(422).render("pages/error",{error: "Setor não existe!"})
        }
        console.log(setor1)
        const setor = await Setor.findAll()

        res.status(200).render("motores/editMotores",{setor1: setor1, setor: setor})
    } catch (error) {
        res.status(500).render("pages/error",{error: "Erro ao carregar o formulário!"})
    }
}

///////////////////////////////////////////////////////////////////////////////////
//Cria um novo motor
controller.create = async (req, res) => {

    const { nomeSetor, linhaSetor } = req.body
    console.log(nomeSetor, linhaSetor)

    try {
        const motor = await Setor.findOne({
            where: {

                nome_setor: nomeSetor
            }
        });
        if (motor) {
            res.status(422).send("Motor já existente no registro existe")
        }      
        
        await Setor.create({nome_setor: nomeSetor, linha_setor: linhaSetor})

        
        const setor = await Setor.findAll({})
        console.log(jason(setor))

        res.status(200).render("setor/indexSetor", {setor: setor})

    } catch (error) {
        res.status(422).send('Ocorreu um erro ao cadastrar o motor' + error)
    }
}

//////////////////////////////////////////////////////////////////////////////////
//Busca todos os motores da lista
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
controller.getById = async (req, res) => {

    const { nomeSetor } = req.params

    try {    

    const setor1 = await Setor.findOne({
        where: {
            nome_setor: nomeSetor
        }
    });

    if (!setor1) {
        res.status(422).send("Motor não existe no banco de dados")
    }

    const setor = await Setor.findAll({
        where: {
            nome_setor: nomeSetor
        }
    })      
        return res.status(200).json(setor)
    } catch (error) {
        res.status(422).json('Ocorreu um erro ao buscar o item' + error)
    }
}

//////////////////////////////////////////////////////////////////////////////////
//Edita as informações do motor
controller.update = async (req, res) => {
    const { id_setor } = req.params
    const { nomeSetor, linhaSetor} = req.body

    try {
        const setor = await Setor.findByPk(id_setor)

        if (!setor) {
            return res.status(422).render("pages/error", { error: "Setor não existe!" })
        }

        if (fabricante) {
            setor.nome_setor = nomeSetor
        }
        if (modelo) {
            setor.linha_setor = linhaSetor
        }
        await setor.save()

        res.status(200).redirect(`/setor`)
    } catch (error) {
        return res.status(422).render("pages/error", { error: "Erro ao atualizar os dados!" })
    }
}

//////////////////////////////////////////////////////////////////////////////////
//Deleta as informações do motor
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


module.exports = controller