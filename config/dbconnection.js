const sequelize = require("sequelize");

const connection = new sequelize("getdatamachine", "root", "@Stiling123",{
    host: "localhost",
    dialect: "mysql",
    define:{
        timestamps: false,
        freezeTableName: true
    }
});

connection.authenticate().then(() => {
    console.log("Conexão estabelecida com o banco de dados.");
}).catch((error) => {
    console.error('Erro ao tentar se conectar com  o servidor', error);
})

module.exports = connection