const express = require('express');
const router = express.Router();
const { Feedback, Usuario } = require('../models/models');

// POST /feedback - salva feedback no banco
router.post('/', async (req, res) => {
  const { mensagem, avaliacao, usuario } = req.body;

  if (!mensagem || !avaliacao || !usuario) {
    return res.status(400).send('Mensagem, avaliação e usuário são obrigatórios');
  }

  try {
    const feedback = new Feedback({
      mensagem,
      avaliacao,
      usuario
    });

    await feedback.save();
    res.send('Feedback enviado com sucesso!');
  } catch (err) {
    console.error('Erro ao salvar feedback:', err);
    res.status(500).send('Erro no servidor');
  }
});

// GET /feedback - lista os feedbacks com nome do usuário
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('usuario', 'nome sobrenome')
      .sort({ createdAt: -1 });

    const resposta = feedbacks.map(f => ({
      mensagem: f.mensagem,
      avaliacao: f.avaliacao,
      nome: f.usuario?.nome || 'Usuário',
      sobrenome: f.usuario?.sobrenome || '',
      criado_em: f.createdAt
    }));

    res.json(resposta);
  } catch (err) {
    console.error('Erro ao buscar feedbacks:', err);
    res.status(500).send('Erro ao carregar feedbacks');
  }
});

module.exports = router;
