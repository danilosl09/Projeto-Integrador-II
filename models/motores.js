const DataTypes = require("sequelize");
const db = require("../config/dbconnection");

const Motores = db.define('motores', {

    id_motores: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },
    
    fabricante_motor: {
        type: DataTypes.STRING,
        allowNull: false
    },

    modelo_motor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    potencia_motor: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

(async () => {
    try {
        await Motores.sync({force: false});
        console.log("Tabela de Dados criada comsucesso!");
    }catch (error) {
        console.error("Não foi possível conectar-se ao banco de dados: ", error)
    }
})();

module.exports = Motores