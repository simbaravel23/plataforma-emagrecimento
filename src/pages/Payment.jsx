import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pendingUser, setPendingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [message, setMessage] = useState('');

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
  }, [searchParams, navigate]);

  async function handlePayment() {
    if (!pendingUser) return;

    setLoading(true);
    setMessage('Redirecionando para o Mercado Pago...');

    try {
      const response = await fetch('http://localhost:5000/api/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: pendingUser.email,
          name: pendingUser.name,
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
        <div className="bg-[#041224] p-10 rounded-3xl border-2 border-white/10 w-full max-w-3xl shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Finalizar Matrícula</h2>
            <p className="mt-3 text-white/60 text-sm uppercase tracking-[0.2em]">
              Complete o pagamento para liberar o acesso ao conteúdo.
            </p>
          </div>

          {pendingUser ? (
            <div className="space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-xl font-black text-white mb-3">Dados do aluno</h3>
                <p className="text-sm text-white/70"><strong>Nome:</strong> {pendingUser.name}</p>
                <p className="text-sm text-white/70"><strong>E-mail:</strong> {pendingUser.email}</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-xl font-black text-white mb-3">Resumo da matrícula</h3>
                <div className="flex flex-col gap-4 text-white/80">
                  <p>Título: Matrícula Plataforma Fit</p>
                  <p>Valor: <strong>R$ 99,90</strong></p>
                  <p>Forma de pagamento: Mercado Pago</p>
                </div>
              </div>

              {message && (
                <div className="rounded-3xl border border-white/10 bg-[#167abc]/10 p-5 text-sm text-white">{message}</div>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={handlePayment}
                  disabled={loading || paid}
                  className="w-full sm:w-auto bg-[#167abc] text-white px-8 py-4 rounded-3xl font-black uppercase tracking-widest hover:bg-[#1a8cd8] transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {paid ? 'Pagamento Concluído' : loading ? 'Aguarde...' : 'Pagar Matrícula'}
                </button>

                <Link
                  to="/auth?mode=login"
                  className="w-full sm:w-auto text-center text-sm uppercase font-black tracking-[0.3em] text-white/80 hover:text-white"
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
