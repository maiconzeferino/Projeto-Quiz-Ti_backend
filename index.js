const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Desenv@1",
  database: "projetoquiz",
  
});

/* Consulta Perguntas */ 
app.get("/Listar", (req, res) => {
  let sqlConsulta = "select * from game order by id desc";
  db.query(sqlConsulta, (err, result) => {
   if(err) console.log(err);
   else res.send(result);
  });
  db.close;
});


app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let mysql = "UPDATE game SET name = ?, cost = ?, category = ? WHERE id = ?";
  db.query(mysql, [name, cost, category, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
  db.close;
});

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
  db.close;
});

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
  db.close;
});

/* Play */ 


app.post("/Play", (req, res) => {
  const { id } = req.body; 
    let sqlConsulta = "select id, pergunta, resp01, resp02, resp03, resp04, respcorreta from game WHERE id = ?";
    db.query(sqlConsulta, [id], (err, result) => {
     if(err) console.log(err);
     else res.send(result);     
    });
});



/* Enviar valores*/
app.post("/cadastrarPergunta", (req, res) => {

  const { pergunta } = req.body;
  const { resp01 } = req.body;
  const { resp02 } = req.body;
  const { resp03 } = req.body;
  const { resp04 } = req.body;
  const { respCorreta } = req.body;

  console.log(pergunta , resp01 , resp02, resp03, resp04, respCorreta);

  let sqlInsert = "insert into game (pergunta, resp01, resp02, resp03, resp04, respCorreta) values (?,?,?,?,?,?)"

   db.query(sqlInsert,[pergunta,resp01,resp02,resp03,resp04,respCorreta],
    (err, result) => {
      console.log(err + "erro1");
     if (err) {
       res.send(err + "erro2")
     }
 
     if (result.length == 0) {
       res.send(err + "erro3")
     }
 
     res.send(result);
   });
   db.close;
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});