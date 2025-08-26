const express = require("express")
const mysql = require("mysql")
const cors = require("cors");

const app = express()
app.use(cors());
app.use(express.json())

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "maths2025"
})

connexion.connect(erro => {
    if(erro) {
        console.log(`Falha ao se conectar ao MySQL: ${erro}`)
    } else {
        console.log(`Conexão efetuada com sucesso`)
    }
})

app.post("/usuarios", (req, res) => {
    const { nome, email, senha } = req.body

    if(!nome || !email || !senha) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" })
    }

    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)"
    const valores = [nome, email, senha]

    connexion.query(sql, valores, (erro, resultado) => {
        if(erro) {
            console.log(erro)
            return res.status(500).json({ erro: "Erro ao inserir usuário" })
        }
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", id: resultado.insertId })
    })
})

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000")
});