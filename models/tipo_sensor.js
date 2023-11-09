const DataTypes = require("sequelize");
const db = require("../config/dbconnection");

const Tipo_Sensor = db.define('tipo_sensor', {

    id_tipo_sensor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    fabricante: {
        type: DataTypes.STRING,
        allowNull: false
    },

    modelo_sensor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    tipo_sensor: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

(async () => {
    try {
        await Tipo_Sensor.sync({force: false});
        console.log("Tabela de Dados criada comsucesso!");
    }catch (error) {
        console.error("Não foi possível conectar-se ao banco de dados: ", error)
    }
})();

module.exports = Tipo_Sensor