const DataTypes = require("sequelize");
const db = require("../config/dbconnection");

const Tipo_de_Dado = db.define('tipo_de_dado', {

    id_tipo_de_dado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    
    tipo_de_dado: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

(async () => {
    try {
        await Tipo_de_Dado.sync({force: false});
        console.log("Tabela de Dados criada comsucesso!");
    }catch (error) {
        console.error("Não foi possível conectar-se ao banco de dados: ", error)
    }
})();

module.exports = Tipo_de_Dado