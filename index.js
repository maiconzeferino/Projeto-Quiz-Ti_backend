const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b93b8f2c5f610d",
  password: "2224bd08",
  database: "heroku_a777fbacd1dd0e0",
});

/* Consulta Perguntas */ 
app.get("/Listar", (req, res) => {
  let sqlConsulta = "select * from game";
  db.query(sqlConsulta, (err, result) => {
   if(err) console.log(err);
   else res.send(result);
  });
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
    db.clos
  });
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
      console.log(err);
     if (err) {
       res.send(err)
     }
 
     if (result.length == 0) {
       res.send(err)
     }
 
     res.send(result);
   });
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});