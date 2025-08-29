-- Cria o banco de dados
CREATE DATABASE maths2025;

-- Seleciona o banco
USE maths2025;

-- Cria a tabela usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    imagem TEXT NOT NULL,
    senha TEXT NOT NULL
);