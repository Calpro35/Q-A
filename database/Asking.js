const Sequelize = require("sequelize");
const connection = require("./database");


const Asking = connection.define('pergunta',{
   
    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

Asking.sync({force: false}).then(()=>{});


module.exports = Asking;