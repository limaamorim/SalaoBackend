const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Usuario } = require('../models/models');

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).send('Usuário não encontrado');

    const match = await bcrypt.compare(password, usuario.senha);
    if (!match) return res.status(401).send('Senha incorreta');

    res.json({
      id: usuario._id,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email
    });
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Rota de cadastro
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, number, password, gender } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const novoUsuario = new Usuario({
      nome: firstname,
      sobrenome: lastname,
      email,
      telefone: number,
      senha: hashedPassword,
      genero: gender
    });

    await novoUsuario.save();
    res.send('Usuário cadastrado com sucesso!');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send('E-mail já cadastrado');
    }
    res.status(500).send('Erro ao processar cadastro');
  }
});

module.exports = router;