const DataTypes = require("sequelize");
const db = require("../config/dbconnection");

const Setor = db.define('setor', {

    id_setor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome_setor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    linha_setor: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

(async () => {
    try {
        await Setor.sync({force: true});
        console.log("Tabela de Dados criada comsucesso!");
    }catch (error) {
        console.error("Não foi possível conectar-se ao banco de dados: ", error)
    }
})();

module.exports = Setor