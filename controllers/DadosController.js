const e = require("connect-flash");
const Dados = require("../models/dados");
const express = require("express")
const sequelize = require("sequelize");
const controller = {}

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

controller.getById = async (req, res) => {

    const { dataInicial, horaInicial, dataFinal, horaFinal } = req.body;
    const starQuery = dataInicial + " " + horaInicial;
    const endQuery = dataFinal + " " + horaFinal;

    console.log("Os dados são " + starQuery + " e " + endQuery);

    try {
        const dados = await Dados.findAll({
            attributes: ['date_time', 'valorDado'],
            where: {
                date_time: {
                    [sequelize.Op.between]: [starQuery, endQuery]
                }
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

        res.status(200).render("dados/indexDados", { chartData: chartData, dados: dados });
        console.log(chartData);

    } catch (error) {
        res.status(500).render("pages/error", { error: "Erro ao carregar a página!" })
        console.log(error)
    }
}

module.exports = controller