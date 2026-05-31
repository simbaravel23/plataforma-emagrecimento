import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Log every incoming request for debugging
app.use((req, res, next) => {
  try { console.log('REQ', req.method, req.path, JSON.stringify(req.body)); } catch(e) { console.log('REQ', req.method, req.path); }
  next();
});

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/plataforma_fit";
if (!process.env.MONGO_URI) {
  console.warn('MONGO_URI não fornecido. Em Render, defina a variável de ambiente MONGO_URI com a sua string do Mongo Atlas.');
}
const JWT_SECRET = process.env.JWT_SECRET || 'SUA_CHAVE_SECRETA';

const mercadopagoClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || 'SEU_TOKEN_DE_TESTE_MERCADOPAGO',
  options: { timeout: 5000 }
});
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'SEU_TOKEN_DE_TESTE_MERCADOPAGO' 
});

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

// Rota de Cadastro Corrigida
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos (nome, e-mail e senha) são obrigatórios." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    
    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    console.error("Erro real no cadastro:", error);

    if (error.code === 11000) {
      return res.status(400).json({ error: "Erro ao cadastrar. E-mail já existe." });
    }

    return res.status(500).json({ 
      error: "Erro interno no servidor ao salvar usuário.", 
      details: error.message 
    });
  }
});

// Rota de Login
app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ auth: true, token, name: user.name });
    } else {
      res.status(401).send({ auth: false, message: "Dados inválidos." });
    }
  } catch (error) {
    next(error);
  }
});

// Rota de pagamento Mercado Pago ALTERADA
app.post('/api/create_preference', async (req, res) => {
  console.log('/api/create_preference called with body:', JSON.stringify(req.body));
  try { require('fs').appendFileSync('/tmp/mp-debug.log', `\n=== ${new Date().toISOString()} REQUEST: ${JSON.stringify(req.body)}\n`); } catch(e) { /* ignore */ }
  
  try {
    // Capturando os novos campos dinâmicos do plano vindos do front
    const { email, name, planTitle, planPrice, success_url, failure_url } = req.body;
    
    const backUrls = {
      success: success_url || 'http://localhost:5173/payment?status=success',
      failure: failure_url || 'http://localhost:5173/payment?status=failure',
    };

    const autoReturn = (backUrls.success && backUrls.success.startsWith('https')) ? 'approved' : undefined;

    // Montando a preferência com os dados recebidos ou fallbacks padrão de segurança
    const preferenceData = {
      body: {
        items: [
          {
            title: planTitle || 'Matrícula Plataforma Fit', // Nome do plano dinâmico
            quantity: 1,
            currency_id: 'BRL',
            unit_price: Number(planPrice) || 99.9, // Valor dinâmico convertido para número
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
app.post('/api/confirm_payment', async (req, res, next) => {
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
    next(error);
  }
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message || 'Erro interno' });
});

// Configuração para ES Modules (import)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve os arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../../dist')));

// Qualquer rota que NÃO comece com /api vai carregar o HTML do seu frontend
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint não encontrado.' });
  }
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));