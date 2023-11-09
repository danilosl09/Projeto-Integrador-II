const DataTypes = require("sequelize");
const db = require("../config/dbconnection");

const Dados = db.define('dados', {

    id_dados: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date_time: {
        type: DataTypes.DATE,
        default: DataTypes.NOW,
        allowNull: false
    },
    valorDado: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

});

(async () => {
    try {
        await Dados.sync({force: false});
        console.log("Tabela de Dados criada comsucesso!");
    }catch (error) {
        console.error("Não foi possível conectar-se ao banco de dados: ", error)
    }
})();

module.exports = Dados