const Sequelize = require('sequelize'); // Importe o Sequelize

// Configuração da conexão com o banco de dados
const connection = new Sequelize('','','', {
    host: 'localhost',
    dialect: 'mysql' // Substitua por 'postgres', 'sqlite', etc., conforme o banco usado
});


module.exports = connection;



