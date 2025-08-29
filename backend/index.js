const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const bcrypt = require("bcrypt");

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

app.post("/usuarios", async (req, res) => {
    const { nome, email, senha, imagem } = req.body

    if(!nome || !email || !senha || !imagem) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" })
    }

    try {
        // Gerar hash da senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        const sql = "INSERT INTO usuarios (nome, email, senha, imagem) VALUES (?, ?, ?, ?)"
        const valores = [nome, email, hashedPassword, imagem]

        connexion.query(sql, valores, (erro, resultado) => {
            if(erro) {
                console.log(erro)
                return res.status(500).json({ erro: "Erro ao inserir usuário" })
            }
            res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", id: resultado.insertId })
        })
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao criptografar senha" })
    }
})

app.post("/check", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const sql = "SELECT * FROM usuarios WHERE email = ?";
    connexion.query(sql, [email], (erro, resultados) => {
        if (erro) return res.status(500).json({ erro: "Erro ao consultar usuário" });

        if (resultados.length === 0) return res.status(404).json({ erro: "Usuário não encontrado" });

        const usuario = resultados[0];

        // Comparar senha
        bcrypt.compare(senha, usuario.senha, (err, ok) => {
            if (err) return res.status(500).json({ erro: "Erro ao verificar senha" });

            if (!ok) return res.status(401).json({ erro: "Senha incorreta" });

            // Retornar usuário sem a senha
            delete usuario.senha;
            res.json(usuario);
        });
    });
});


app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000")
});