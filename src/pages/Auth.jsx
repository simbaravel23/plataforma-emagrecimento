import React, { useState } from 'react';
import Header from '../components/Header';

export default function Auth() {
  // Estado para alternar entre Login e Cadastro
  const [isLogin, setIsLogin] = useState(true);
  
  // Estado para capturar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Função para lidar com o envio dos dados para o MongoDB via API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    
    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Armazena o Token JWT para acesso ao Dashboard
          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.name);
          window.location.href = '/dashboard'; 
        } else {
          alert("Cadastro realizado com sucesso! Faça seu login.");
          setIsLogin(true);
        }
      } else {
        alert(data.error || data.message || "Erro na operação.");
      }
    } catch (err) {
      console.error("Erro ao conectar com o servidor Node/Mongo:", err);
      alert("Certifique-se de que o servidor backend está rodando na porta 5000.");
    }
  };

  return (
    <div className="min-h-screen bg-[#051933] flex flex-col text-white selection:bg-white selection:text-black">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="bg-[#041224] p-10 rounded-3xl border-2 border-white/10 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
              {isLogin ? 'Bem-vindo de Volta' : 'Criar Nova Conta'}
            </h2>
            <p className="mt-2 text-white/60 font-bold uppercase text-[10px] tracking-[0.2em]">
              {isLogin ? 'Acesse sua área de treino' : 'Comece sua transformação hoje'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-white">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-[#051933] border-2 border-white/10 p-4 rounded-xl text-white outline-none focus:border-white transition-all placeholder:text-white/20"
                  placeholder="Seu nome"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-white">E-mail de Acesso</label>
              <input 
                type="email" 
                required
                className="w-full bg-[#051933] border-2 border-white/10 p-4 rounded-xl text-white outline-none focus:border-white transition-all placeholder:text-white/20"
                placeholder="exemplo@email.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-white">Senha</label>
              <input 
                type="password" 
                required
                className="w-full bg-[#051933] border-2 border-white/10 p-4 rounded-xl text-white outline-none focus:border-white transition-all placeholder:text-white/20"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-[#051933] py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl mt-4"
            >
              {isLogin ? 'Entrar Agora' : 'Finalizar Cadastro'}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/50 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
            >
              {isLogin ? 'Ainda não tem conta? Clique aqui' : 'Já possui cadastro? Fazer Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}