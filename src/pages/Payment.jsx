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
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-24">
        {/* Layout Master em Grid de 2 Colunas para telas grandes */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA: O que o cliente terá no programa */}
          <div className="lg:col-span-5 bg-[#041224] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            <div>
              <span className="text-[10px] bg-[#167abc]/25 text-[#8ed4ff] px-3 py-1 rounded-full font-black uppercase tracking-widest">
                O Programa Completo
              </span>
              <h3 className="text-2xl font-black uppercase italic tracking-tight mt-3 text-white">
                Sua Jornada de Transformação
              </h3>
              <p className="text-xs text-white/60 mt-1">Veja tudo o que está incluso no seu acesso imediato:</p>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-4">
              {/* Fase 1 */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs bg-[#167abc] text-white font-bold h-5 w-5 rounded-full flex items-center justify-center">1</span>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#8ed4ff]">Fase 1 • Estado Inicial</h4>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Quebra de inércia e construção do hábito milimétrico. Circuito diário de alongamento, força core/superior protetora e cardio com 300 socos. Alinhamento mental com mantras primitivos diários.
                </p>
              </div>

              {/* Fase 2 */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs bg-[#167abc] text-white font-bold h-5 w-5 rounded-full flex items-center justify-center">2</span>
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400">Fase 2 • Cura pelo Som</h4>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Aceleração basal com Jejum Matinal Consciente. Aumento calistênico estrutural (600 socos) integrado à musculação localizada e blindagem mental obrigatória por frequências puras binaurais (432Hz, 741Hz e 528Hz/522Hz Theta).
                </p>
              </div>

              {/* Fase 3 */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs bg-[#167abc] text-white font-bold h-5 w-5 rounded-full flex items-center justify-center">3</span>
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">Fase 3 • Cura pela Natureza</h4>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Quebra de platô metabólico via elixires naturais e shots matinais (sal integral, limão, canela, cravo) + chás imunomoduladores. Treinos calistênicos elevados (até 1000 socos) e reprogramação via Gratidão Antecipada (888Hz).
                </p>
              </div>

              {/* Fase 4 */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs bg-[#167abc] text-white font-bold h-5 w-5 rounded-full flex items-center justify-center">4</span>
                  <h4 className="text-xs font-black uppercase tracking-wider text-purple-400">Fase 4 • Mindset de Superação</h4>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Protocolo radical de queima de gordura: corte absoluto de farinhas/açúcares, jejum intermitente avançado de 23h associado ao shot de babosa purificada. Auto-hipnose aplicada e ativação comportamental baseada em pilares de elite.
                </p>
              </div>
            </div>

            <div className="bg-[#167abc]/10 p-3.5 rounded-2xl border border-[#167abc]/30 text-center text-[11px] text-white/80">
              🔒 <strong>Garantia de Satisfação Incondicional:</strong> Plataforma 100% segura com criptografia ponta a ponta.
            </div>
          </div>

          {/* COLUNA DIREITA: Tela de Pagamento Atual */}
          <div className="lg:col-span-7 bg-[#041224] p-6 sm:p-10 rounded-3xl border-2 border-white/10 w-full shadow-2xl">
            
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">Finalizar Matrícula</h2>
              <p className="mt-3 text-white/60 text-sm uppercase tracking-[0.2em]">
                Escolha seu plano e complete o pagamento para liberar o acesso.
              </p>
            </div>

            {pendingUser ? (
              <div className="space-y-10">
                
                {/* Dados do Aluno */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-sm font-black text-white mb-3 uppercase tracking-wider">Dados do aluno</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                    <p><strong>Nome:</strong> {pendingUser.name}</p>
                    <p><strong>E-mail:</strong> {pendingUser.email}</p>
                  </div>
                </div>

                {/* Seleção de Planos */}
                <div>
                  <h3 className="text-center text-md font-black uppercase italic tracking-wider mb-6">
                    Selecione o Plano de Acesso
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {PLANS.map((plan) => {
                      const isSelected = selectedPlan === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className={`cursor-pointer rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-300 border-2 relative gap-4 ${
                            isSelected
                              ? 'bg-white/10 border-[#167abc] shadow-[0_0_20px_rgba(22,122,188,0.15)]'
                              : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07]'
                        }`}
                      >
                        {plan.id === '1_year' && (
                          <span className="absolute -top-2.5 right-6 bg-[#167abc] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                            Mais Recomendado
                          </span>
                        )}

                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                            isSelected ? 'border-[#167abc]' : 'border-white/30'
                          }`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#167abc]" />}
                          </div>
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-tight">{plan.title}</h4>
                            <p className="text-[11px] text-white/50">{plan.description}</p>
                            <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-[10px] text-white/60">
                                  <span className="w-1 h-1 rounded-full bg-[#167abc] mr-1.5" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="text-left sm:text-right border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0 shrink-0">
                          <span className="text-xl font-black">R$ {plan.price}</span>
                          <span className="text-[10px] block text-white/50 uppercase tracking-wider">{plan.details}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

                {message && (
                  <div className="rounded-2xl border border-white/10 bg-[#167abc]/10 p-4 text-xs text-center text-white">
                    {message}
                  </div>
                )}

                {/* Botão de Ação Principal */}
                <div className="flex flex-col gap-4 items-center justify-center pt-4 border-t border-white/5">
                  <button
                    onClick={handlePayment}
                    disabled={loading || paid}
                    className="w-full bg-[#167abc] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#1a8cd8] transition disabled:cursor-not-allowed disabled:opacity-50 text-center shadow-[0_4px_20px_rgba(22,122,188,0.3)] text-xs"
                  >
                    {paid ? 'Pagamento Concluído' : loading ? 'Aguarde...' : 'Ir para o Pagamento'}
                  </button>

                  <Link
                    to="/auth?mode=login"
                    className="text-[10px] uppercase font-black tracking-[0.3em] text-white/50 hover:text-white transition"
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
    </div>
  );
}