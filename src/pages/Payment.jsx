import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';

// Definição dos planos disponíveis
const PLANS = [
  {
    id: '4_months',
    title: 'Acesso 4 Meses',
    description: 'Ideal para objetivos de curto prazo.',
    price: 497,
    details: 'Em até 12x no cartão',
    features: ['Acesso completo por 4 meses', 'Atualizações inclusas']
  },
  {
    id: '1_year',
    title: 'Acesso 1 Ano',
    description: 'O tempo ideal para dominar o conteúdo.',
    price: 987,
    details: 'À vista ou parcelado',
    features: ['Acesso completo por 12 meses', 'Suporte prioritário', 'Bônus exclusivos']
  },
  {
    id: 'lifetime',
    title: 'Acesso Vitalício',
    description: 'Pague uma vez, acesse para sempre.',
    price: 1897,
    details: 'Pagamento único',
    features: ['Acesso vitalício (sem renovação)', 'Todas as atualizações futuras', 'Grupo VIP de alunos']
  }
];

export default function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pendingUser, setPendingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [message, setMessage] = useState('');
  
  // Estado para controlar qual plano o usuário selecionou (padrão: 1 ano)
  const [selectedPlan, setSelectedPlan] = useState('1_year');

  useEffect(() => {
    const stored = localStorage.getItem('pendingRegistration');
    if (!stored) {
      navigate('/auth?mode=register');
      return;
    }

    setPendingUser(JSON.parse(stored));
  }, [navigate]);

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success') {
      setPaid(true);
      
      if (pendingUser?.email) {
        fetch('/api/confirm_payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: pendingUser.email })
        })
          .then(res => res.json())
          .then(data => console.log('Pagamento confirmado no banco:', data))
          .catch(err => console.error('Erro ao confirmar pagamento:', err));
      }

      setMessage('Pagamento aprovado! Sua matrícula foi finalizada. Redirecionando para o login...');
      localStorage.removeItem('pendingRegistration');

      const timer = setTimeout(() => {
        navigate('/auth?mode=login');
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (status === 'failure') {
      setMessage('Pagamento não concluído. Tente novamente ou entre em contato com o suporte.');
    }
  }, [searchParams, navigate, pendingUser]);

  async function handlePayment() {
    if (!pendingUser) return;

    setLoading(true);
    setMessage('Redirecionando para o Mercado Pago...');

    // Encontra os dados do plano selecionado para enviar ao backend
    const planDetails = PLANS.find(p => p.id === selectedPlan);

    try {
      const response = await fetch('/api/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: pendingUser.email,
          name: pendingUser.name,
          planId: planDetails.id,
          planTitle: planDetails.title,
          planPrice: planDetails.price,
          success_url: `${window.location.origin}/payment?status=success`,
          failure_url: `${window.location.origin}/payment?status=failure`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar o pagamento.');
      }

      window.location.href = data.init_point || data.sandbox_init_point;
    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessage('Não foi possível iniciar o pagamento. Confira o backend e o token do Mercado Pago.');
    }
  }

  return (
    <div className="min-h-screen bg-[#051933] text-white selection:bg-white selection:text-black">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="bg-[#041224] p-6 sm:p-10 rounded-3xl border-2 border-white/10 w-full max-w-5xl shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Finalizar Matrícula</h2>
            <p className="mt-3 text-white/60 text-sm uppercase tracking-[0.2em]">
              Escolha seu plano e complete o pagamento para liberar o acesso.
            </p>
          </div>

          {pendingUser ? (
            <div className="space-y-10">
              
              {/* Dados do Aluno */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-wider">Dados do aluno</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/70">
                  <p><strong>Nome:</strong> {pendingUser.name}</p>
                  <p><strong>E-mail:</strong> {pendingUser.email}</p>
                </div>
              </div>

              {/* Seleção de Planos (Grid de Cards) */}
              <div>
                <h3 className="text-center text-xl font-black uppercase italic tracking-wider mb-6">
                  Selecione o Plano de Acesso
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`cursor-pointer rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-2 relative ${
                          isSelected
                            ? 'bg-white/10 border-[#167abc] shadow-[0_0_25px_rgba(22,122,188,0.2)] scale-[1.02]'
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07]'
                        }`}
                      >
                        {plan.id === '1_year' && (
                          <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#167abc] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                            Mais Recomendado
                          </span>
                        )}

                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-black uppercase tracking-tight">{plan.title}</h4>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-[#167abc]' : 'border-white/30'
                            }`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#167abc]" />}
                            </div>
                          </div>
                          
                          <p className="text-xs text-white/50 mb-4">{plan.description}</p>
                          
                          <div className="mb-6">
                            <span className="text-3xl font-black">R$ {plan.price}</span>
                            <span className="text-xs block text-white/60 mt-1 uppercase tracking-wider">{plan.details}</span>
                          </div>

                          <ul className="space-y-2 border-t border-white/10 pt-4">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start text-xs text-white/80">
                                <svg className="h-4 w-4 text-[#167abc] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {message && (
                <div className="rounded-3xl border border-white/10 bg-[#167abc]/10 p-5 text-sm text-center text-white max-w-2xl mx-auto下">
                  {message}
                </div>
              )}

              {/* Botão de Ação Principal */}
              <div className="flex flex-col gap-6 items-center justify-center pt-4 border-t border-white/5">
                <button
                  onClick={handlePayment}
                  disabled={loading || paid}
                  className="w-full sm:w-auto min-w-[280px] bg-[#167abc] text-white px-10 py-4 rounded-3xl font-black uppercase tracking-widest hover:bg-[#1a8cd8] transition disabled:cursor-not-allowed disabled:opacity-50 text-center shadow-[0_4px_20px_rgba(22,122,188,0.3)]"
                >
                  {paid ? 'Pagamento Concluído' : loading ? 'Aguarde...' : 'Ir para o Pagamento'}
                </button>

                <Link
                  to="/auth?mode=login"
                  className="text-xs uppercase font-black tracking-[0.3em] text-white/50 hover:text-white transition"
                >
                  Voltar para login
                </Link>
              </div>

            </div>
          ) : (
            <div className="text-center text-white/70">
              <p>Redirecionando para o cadastro...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}