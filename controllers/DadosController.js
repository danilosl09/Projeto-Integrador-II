
const Dados = require("../models/dados");
const Sensores = require("../models/sensores");
const TipoDado = require("../models/tipo_de_dado");
const sequelize = require("sequelize");
const controller = {}

/////////////////////////////////////////////////////////////////////////////////////////////////
// --> seleciona todo os dados da tabela dados
controller.getAll = async (req, res) => {

    try {
        const dados = await Dados.findAll({});

        const eixoX = [];
        const eixoY = [];

        for (let i = 0; i < dados.length; i++) {
            eixoX.push(dados[i].date_time);
            eixoY.push(dados[i].valorDado);
        };

        const data = {
            labels: eixoX,
            datasets: [{
                label: 'Dados',
                data: eixoY,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        };

        const chartData = JSON.stringify(data);

        res.status(200).render("dados/indexDados", { chartData: chartData, dados: dados });

    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar a página!" })
        console.log(error)
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////
// --> seleciona os dados da tabela dados definidos pela dara e hora inicial e final
controller.getById = async (req, res) => {

    const { idSensores, dataInicial, horaInicial, dataFinal, horaFinal } = req.body;
    const idSensor1 = parseInt(idSensores);
    const starQuery = dataInicial + " " + horaInicial;
    const endQuery = dataFinal + " " + horaFinal;

    console.log(idSensor1)
    console.log("Os dados são " + idSensores+ starQuery + " e " + endQuery);

    try {
            const dados = await Dados.findAll({
                attributes: ['date_time', 'valorDado'],
                where: {

                    [sequelize.Op.and]: [
                        { id_sensores: idSensor1 },
                        {
                            date_time: {
                                [sequelize.Op.between]: [starQuery, endQuery]
                            }
                        }
                    ]
                }
            });

        const eixoX = [];
        const eixoY = [];

        for (let i = 0; i < dados.length; i++) {
            eixoX.push(dados[i].date_time);
            eixoY.push(dados[i].valorDado);
        };

        const data = {
            labels: eixoX,
            datasets: [{
                label: 'Dados',
                data: eixoY,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        };

        const chartData = JSON.stringify(data);

        res.status(200).render("dados/showGraphDados", { chartData: chartData, dados: dados });
        console.log(chartData);

    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar a página!" })
        console.log(error)
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = controller
