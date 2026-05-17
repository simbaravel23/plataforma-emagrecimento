import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// Log every incoming request for debugging
app.use((req, res, next) => {
  try { console.log('REQ', req.method, req.path, JSON.stringify(req.body)); } catch(e) { console.log('REQ', req.method, req.path); }
  next();
});
// Log every incoming request for debugging
app.use((req, res, next) => {
  try { console.log('REQ', req.method, req.path, JSON.stringify(req.body)); } catch(e) { console.log('REQ', req.method, req.path); }
  next();
});

const mercadopagoClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || 'SEU_TOKEN_DE_TESTE_MERCADOPAGO',
  options: { timeout: 5000 }
});
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'SEU_TOKEN_DE_TESTE_MERCADOPAGO' 
});
// String de conexão do MongoDB (local ou Atlas)
// Para Atlas, use: mongodb+srv://usuario:senha@cluster.mongodb.net/plataforma_fit
// Para local, use: mongodb://localhost:27017/plataforma_fit
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/plataforma_fit";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB com sucesso!"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Schema do Usuário
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'aluno' },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date, default: null },
  preferenceId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
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

// Rota de pagamento Mercado Pago
// Procure por essa rota no seu index.js e ajuste o final do bloco try:
app.post('/api/create_preference', async (req, res) => {
  console.log('/api/create_preference called with body:', JSON.stringify(req.body));
  try { require('fs').appendFileSync('/tmp/mp-debug.log', `\n=== ${new Date().toISOString()} REQUEST: ${JSON.stringify(req.body)}\n`); } catch(e) { /* ignore */ }
  try {
    const { email, name, success_url, failure_url } = req.body;
    const backUrls = {
      success: success_url || 'http://localhost:5173/payment?status=success',
      failure: failure_url || 'http://localhost:5173/payment?status=failure',
    };

    // Only set auto_return when success URL is HTTPS (avoids invalid_auto_return for localhost)
    const autoReturn = (backUrls.success && backUrls.success.startsWith('https')) ? 'approved' : undefined;

    const preferenceData = {
      body: {
        items: [
          {
            title: 'Matrícula Plataforma Fit',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 99.9,
          },
        ],
        payer: {
          email: email || 'test_user_123@testuser.com',
          name: name || 'Aluno',
        },
        back_urls: backUrls,
        ...(autoReturn ? { auto_return: autoReturn } : {}),
      }
    };

    // Use REST API directly to create preference (avoids SDK inconsistencies)
    console.log('Creating Mercado Pago preference via REST with body:', JSON.stringify(preferenceData.body));
    const mpResp = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify(preferenceData.body)
    });

    const mpData = await mpResp.json();
    console.log('MP REST response status:', mpResp.status, 'body:', JSON.stringify(mpData));

    if (!mpResp.ok) {
      console.error('Mercado Pago API error:', mpData);
      return res.status(500).send({ error: 'Erro ao criar preferência de pagamento.' });
    }

    const init_point = mpData.init_point ?? mpData.sandbox_init_point ?? null;
    const sandbox_init_point = mpData.sandbox_init_point ?? null;
    console.log('MP preference created (REST):', { init_point, sandbox_init_point });
    res.json({ init_point, sandbox_init_point });
  } catch (error) {
    console.error('Erro Mercado Pago:', {
      message: error?.message,
      status: error?.status || error?.response?.status,
      body: error?.response?.data || error,
    });
    res.status(500).send({ error: 'Erro ao criar preferência de pagamento.' });
  }
});

// Rota para confirmar pagamento e atualizar usuário
app.post('/api/confirm_payment', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { isPaid: true, paidAt: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Pagamento confirmado!', user });
  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    res.status(500).send({ error: 'Erro ao confirmar pagamento.' });
  }
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
