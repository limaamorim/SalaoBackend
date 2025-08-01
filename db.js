const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado!');
  } catch (err) {
    console.error('Erro na conexão com MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = { mongoose, connectDB };