const DataTypes = require("sequelize");
const db = require("../config/dbconnection");

const Sensores = db.define('sensores', {

    id_sensores: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    tagSensor: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

(async () => {
    try {
        await Sensores.sync({force: false});
        console.log("Tabela de Dados criada comsucesso!");
    }catch (error) {
        console.error("Não foi possível conectar-se ao banco de dados: ", error)
    }
})();

module.exports = Sensores