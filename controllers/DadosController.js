const Dados = require("../models/dados");

const controller = {}

controller.getAll = async (req, res) => {

    try {

        const dados = await Dados.findAll({});
        const jasonDados = JSON.stringify(dados);
        console.log(dados);
        console.log(dados[0].id_dados, dados[0].valorDado);
        console.log(dados[1].id_dados, dados[1].valorDado);
        console.log(dados[2].id_dados, dados[2].valorDado);
        console.log(dados[3].id_dados, dados[3].valorDado);
        res.status(200).render("dados/indexDados", {dados:dados, jasonDados: jasonDados});
        console.log(jasonDados);
    
        
    } catch (error) {
        res.status(500).render("pages/error",{error: "Erro ao carregar a página!"})
        console.log(error)
    }
}

// controller.getAll = async (req, res) => {
//     try {
//         const dados = await Dados.findAll({

//         })
        
//         res.status(200).render("dados/indexDadosTest", {dados:dados})
//     } catch (error) {
//         res.status(500).render("pages/error",{error: "Erro ao carregar a página!"})
//     }
// }

module.exports = controller