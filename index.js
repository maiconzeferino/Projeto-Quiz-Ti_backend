const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "projetos",
  password: "1234",
  database: "projetoquiz",
});

/* Cadastrar Pergunta */
app.post("/cadastrarPergunta", (req, res) => {
  const { pergunta } = req.body;
  const { resp01 } = req.body;
  const { resp02 } = req.body;
  const { resp03 } = req.body;
  const { resp04 } = req.body;
  const { respCorreta } = req.body;
  let sqlInsert = "insert into game (pergunta, resp01, resp02, resp03, resp04, respCorreta) values (?,?,?,?,?,?)";
   db.query(sqlInsert,[pergunta,resp01,resp02,resp03,resp04,respCorreta],
        (err, result) => {
          console.log("Dados Recebidos e salvo : " + pergunta , resp01 , resp02, resp03, resp04, respCorreta);
          res.send("Regitro salvo");
    if (err) {
          res.send("Erro ao registrar a pergunta" + err);
        } 
    if (result.length == 0) {
       res.send("Restrigo não inserido" + err);
     }
   });
});

/* Listar Perguntas */ 
app.get("/Listar", (req, res) => {
  let sqlConsulta = "select * from game order by id desc";
  db.query(sqlConsulta, (err, result) => {
    if(err) {
      console.log("Erro para listar as perguntas");
      res.send("Erro para listar as perguntas");
    } 
    
    if (result.length == 0) {
      console.log("Não localizado os registros");
      res.send("Não localizado os registros");
    } else res.send(result);
  });
  console.log("Retornando lista de perguntas");
});

/* Play */ 
app.post("/Play", (req, res) => {
  const { id } = req.body; 
    let sqlConsulta = "select id, pergunta, resp01, resp02, resp03, resp04, respcorreta from game WHERE id = ?";
    db.query(sqlConsulta, [id], (err, result) => {
  
    if(err){
      console.log("Erro para a consulta");
      res.send("Erro para a consulta");
    } 
    
    if (result.length == 0) {
      console.log("Resgistro não localizado");
      res.send("Resgistro não localizado");
    } else {
      res.send(result);
    }    
    });
});

/* Editar */
app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let mysql = "UPDATE game SET name = ?, cost = ?, category = ? WHERE id = ?";
  db.query(mysql, [name, cost, category, id], (err, result) => {
    if (err) {
      console.log("Erro para editar");
      res.send("Erro para editar");
    } else {
      res.send(result);
    }
  });
});

/* Exclusão */
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM game WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* Pesquisa */ 
app.post("/search", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let mysql =
    "SELECT * from game WHERE name = ? AND cost = ? AND category = ?";
  db.query(mysql, [name, cost, category], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});