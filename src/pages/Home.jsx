import React from 'react';
import Header from '../components/Header';

const categorias = [
  { 
    titulo: "Exercícios Livres", 
    imagem: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500", 
    descricao: "Treinos utilizando apenas o peso do corpo para força e resistência." 
  },
  { 
    titulo: "Alongamento", 
    imagem: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=500", 
    descricao: "Melhore sua flexibilidade e postura com rotinas diárias guiadas." 
  },
  { 
    titulo: "Meditação", 
    imagem: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500", 
    descricao: "Foco e relaxamento profundo utilizando frequências Solfeggio." 
  }
];

const depoimentos = [
  { id: 1, aluno: "Ana Silva", resultado: "-12kg", thumb: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400" },
  { id: 2, aluno: "Marcos Oliveira", resultado: "-8kg", thumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400" },
  { id: 3, aluno: "Juliana Costa", resultado: "-15kg", thumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#051933] !text-white selection:bg-white selection:text-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <h1 className="text-6xl md:text-7xl font-black leading-tight !text-white uppercase italic drop-shadow-2xl">
              TRANSFORME <br />
              <span className="!text-white">SEU CORPO</span> <br />
              <span className="!text-white">HOJE MESMO.</span>
            </h1>
            <p className="mt-8 !text-white text-xl max-w-lg leading-relaxed font-bold opacity-100">
              Aprenda a transformar seu corpo com exercícios livres e sua mente através de meditação guiada e alongamento.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-[#041224] border-2 border-white px-6 py-4 rounded-lg w-full sm:w-80 !text-white placeholder:text-white/60 outline-none"
              />
              <button className="bg-white !text-[#051933] hover:bg-gray-200 px-10 py-4 rounded-lg font-black text-sm tracking-wider uppercase transition-all">
                QUERO COMEÇAR
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800" 
              alt="Treino" 
              className="rounded-2xl border-2 border-white/30 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Grid de Módulos */}
      <section className="py-24 bg-[#041224] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-sm font-black tracking-[0.4em] !text-white uppercase mb-12 border-b-2 border-white pb-4 inline-block">
            MÓDULOS DO PROGRAMA
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categorias.map((cat, i) => (
              <div key={i} className="bg-[#051933] rounded-2xl overflow-hidden border-2 border-white/10 hover:border-white transition-all duration-500 group">
                <div className="h-60 overflow-hidden">
                  <img src={cat.imagem} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4 !text-white uppercase italic italic">
                    {cat.titulo}
                  </h3>
                  <p className="!text-white leading-relaxed font-bold">
                    {cat.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black !text-white uppercase mb-16 italic text-center">Resultados Reais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.map((video) => (
            <div key={video.id} className="group">
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-white transition-all">
                <img src={video.thumb} className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center !text-[#051933]">
                    <span className="text-2xl ml-1">▶</span>
                  </div>
                </div>
              </div>
              <h4 className="mt-4 !text-white font-black text-lg uppercase">{video.aluno}</h4>
              <span className="inline-block bg-white !text-[#051933] px-3 py-1 rounded text-xs font-black mt-2">{video.resultado}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-32 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-12 !text-white uppercase italic">Sua nova vida começa aqui</h2>
        <button className="bg-white !text-[#051933] px-20 py-6 rounded-full font-black text-xl uppercase tracking-tighter hover:scale-105 transition-transform shadow-white/20 shadow-2xl">
          MATRICULE-SE AGORA
        </button>
      </footer>
    </div>
  );
}