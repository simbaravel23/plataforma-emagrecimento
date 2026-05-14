import React from 'react';
import Header from '../components/Header';

const categorias = [
  { 
    titulo: "Exercícios Livres", 
    imagem: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400", 
    descricao: "Treinos utilizando apenas o peso do corpo." 
  },
  { 
    titulo: "Alongamento", 
    imagem: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=400", 
    descricao: "Melhore sua flexibilidade e postura." 
  },
  { 
    titulo: "Meditação", 
    imagem: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400", 
    descricao: "Foco com frequências Solfeggio." 
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#051933] !text-white selection:bg-white selection:text-black overflow-x-hidden">
      <Header />
      
      {/* Hero Section Centralizada */}
      <section className="pt-56 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-black leading-tight !text-white uppercase italic drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
          TRANSFORME <br />
          <span className="!text-white">SEU CORPO</span> <br />
          <span className="!text-white">HOJE MESMO.</span>
        </h1>
        <p className="mt-8 !text-white/80 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          Aprenda a transformar seu corpo com exercícios livres e sua mente através de meditação guiada e alongamento.
        </p>

        {/* Captura de E-mail Menor no Canto Direito */}
        <div className="mt-12 flex justify-center lg:justify-end">
          <div className="flex bg-[#041224] border border-white/20 p-1 rounded-full shadow-2xl w-full max-w-sm">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="bg-transparent px-5 py-2 w-full !text-white text-sm outline-none placeholder:text-white/40"
            />
            <button className="bg-white !text-[#051933] px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-tighter hover:bg-gray-200 transition-all whitespace-nowrap">
              COMEÇAR
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Módulos com Imagens Reduzidas */}
      <section className="py-20 bg-[#041224]/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-12 bg-white"></div>
            <h2 className="text-xs font-black tracking-[0.4em] !text-white uppercase">
              MÓDULOS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categorias.map((cat, i) => (
              <div key={i} className="group cursor-pointer">
                {/* Tamanho da imagem reduzido (h-48 em vez de h-60) */}
                <div className="h-48 rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/50 transition-all duration-500 shadow-lg">
                  <img 
                    src={cat.imagem} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-black !text-white uppercase italic italic mb-2 tracking-tight">
                    {cat.titulo}
                  </h3>
                  <p className="!text-white/60 text-sm font-bold leading-snug">
                    {cat.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-black !text-white/20 uppercase tracking-[0.5em]">
          Plataforma de Treinamento Elite
        </p>
      </footer>
    </div>
  );
}