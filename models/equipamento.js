const DataTypes = require("sequelize");
const db = require("../config/dbconnection");

const Equipamento = db.define('equipamento', {

    id_equipamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    tag_equipamento: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

(async () => {
    try {
        await Equipamento.sync({force: false});
        console.log("Tabela de Dados criada comsucesso!");
    }catch (error) {
        console.error("Não foi possível conectar-se ao banco de dados: ", error)
    }
})();

module.exports = Equipamento