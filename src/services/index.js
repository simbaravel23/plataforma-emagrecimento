const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Substitua pela sua string de conexão do MongoDB
const MONGO_URI = "mongodb://localhost:27017/plataforma_fit";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB com sucesso!"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Schema do Usuário
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'aluno' } // Útil para sua gestão de instrutores
});

const User = mongoose.model('User', UserSchema);

// Rota de Cadastro
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(400).send({ error: "Erro ao cadastrar. E-mail já existe." });
  }
});

// Rota de Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, 'SUA_CHAVE_SECRETA', { expiresIn: '1d' });
    res.json({ auth: true, token, name: user.name });
  } else {
    res.status(401).send({ auth: false, message: "Dados inválidos." });
  }
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));