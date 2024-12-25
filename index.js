const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const connection = require("./database/database");
const Asking = require("./database/Asking");
const { where } = require("sequelize");
const Answer = require("./database/Answer");


// Teste de conexão // promisse
connection.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso.');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });



app.set('view engine', 'ejs');
app.use(express.static('public'));

//recebe os dados dos formularios
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


//rotas
app.get("/",(req,res)=>{
    
    Asking.findAll({ raw: true, order:[
      ['id','DESC']
    ]}).then(askings => {
             
       res.render("index",{
         askings: askings
       });
    
   });
    
   });  

app.get("/ask", (req,res) =>{
 res.render("asking");

});

app.post("/salvarPergunta",(req,res) => {
  
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
  
    Asking.create({
        titulo: titulo,
        descricao:descricao
      }).then(()=>{
            res.redirect("/") ;    
       });
});

app.get("/ask/:id", (req,res) =>{
  var id = req.params.id;
  Asking.findOne({
    where:{id:id}
  }).then(asking => {
     if(asking != undefined){ //resposta encontrada
      Answer.findAll({
        where: {askingId:asking.id}
      }).then(answers =>{
        res.render("ask",{
          asking: asking,
          answers: answers
         });
      })
     }else{
         res.redirect("/");
     }
  });
  
});


app.post("/answers", (req,res)=>{
     var body = req.body.body;
     var askingId = req.body.asking
     Answer.create({
      body: body,
      askingId:askingId
    }).then(()=>{
          res.redirect("/ask/" + askingId);    
     });
});

app.listen(8080,()=>{console.log("App rodando!");});








