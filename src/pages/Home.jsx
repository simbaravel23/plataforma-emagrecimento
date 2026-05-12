import React from 'react';
import Header from '../componentes/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <Header />
      
      {/* Hero Section - Ajustada para máxima legibilidade */}
      <section className="relative h-screen flex items-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470" 
            className="w-full h-full object-cover opacity-30"
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-white">
              JUST <br />
              BELIEVE <br />
              NO <br />
              <span className="text-white border-t-4 border-b-4 border-white inline-block mt-4 py-2">
                EXCUSES
              </span>
            </h1>
            
            <p className="mt-8 text-white text-lg md:text-2xl max-w-xl font-medium leading-relaxed drop-shadow-lg">
              O método definitivo de emagrecimento dividido em 4 fases estratégicas para transformar seu corpo e sua mente.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-6">
              <button className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-base hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Começar Agora
              </button>
              <button className="border-2 border-white text-white px-12 py-5 rounded-full font-black uppercase text-base hover:bg-white hover:text-black transition-all">
                Ver Vídeo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Explicativa do Programa (Vídeo + Texto) */}
      <section className="py-24 px-4 bg-[#0d0d0d] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Como funciona o Programa</h2>
            <div className="w-24 h-2 bg-white mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Espaço para o Vídeo de Vendas */}
            <div className="aspect-video bg-gray-900 rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl overflow-hidden relative group">
               <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all cursor-pointer">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-white/50 shadow-xl transform group-hover:scale-110 transition-transform">
                    <span className="text-3xl ml-1">▶</span>
                  </div>
               </div>
               <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800" className="w-full h-full object-cover opacity-50" />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest italic">A ciência por trás do método</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Nossa metodologia foi desenhada para reprogramar o seu metabolismo. Não é apenas sobre comer menos, é sobre comer certo e treinar com inteligência.
              </p>
              <ul className="space-y-4">
                {['Fase Detox', 'Aceleração', 'Queima Máxima', 'Estilo de Vida'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-bold">
                    <span className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-sm">{i+1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-16 text-center tracking-tighter">Resultados de nossos alunos</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { nome: "Ana Silva", kg: "-12kg", msg: "O método mudou minha vida. A fase detox foi fundamental!" },
              { nome: "Marcos Oliveira", kg: "-8kg", msg: "Finalmente um programa que consigo seguir sem passar fome." },
              { nome: "Juliana Costa", kg: "-15kg", msg: "Os vídeos são objetivos e os áudios me mantêm motivada todos os dias." }
            ].map((dep, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all group">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, s) => <span key={s}>★</span>)}
                </div>
                <p className="text-white italic mb-6 text-lg">"{dep.msg}"</p>
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <span className="font-bold uppercase tracking-widest text-sm">{dep.nome}</span>
                  <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-black">{dep.kg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}