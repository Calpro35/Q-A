const express = require("express");
const app = express();

const bodyParser = require("body-parser");


app.set('view engine', 'ejs');
app.use(express.static('public'));

//recebe os dados dos formularios
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


//rotas
app.get("/",(req,resp)=>{
     resp.render("index");
});  

app.get("/ask", (req,res) =>{
 res.render("asking");

});

app.post("/salvarPergunta",(req,resp) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    resp.send("recebido o form! " + titulo + " " + descricao  )     
});

app.listen(8080,()=>{console.log("App rodando!");});








