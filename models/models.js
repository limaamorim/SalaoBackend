const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String },
  senha: { type: String, required: true },
  genero: { type: String }
}, { timestamps: true });

const FeedbackSchema = new mongoose.Schema({
  mensagem: { type: String, required: true },
  avaliacao: { type: Number, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', UsuarioSchema);
const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = { Usuario, Feedback };