const Sequelize = require("sequelize");
const connection = require("./database");


const Answer = connection.define("answers",{
   body:{
    type: Sequelize.TEXT,
    alowNull: false
   },
   askingId:{
     type: Sequelize.INTEGER,
     alowNull: false  
   }
})


Answer.sync({force:false});

module.exports = Answer;