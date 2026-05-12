import React from 'react';
import Header from '../componentes/Header';

export default function Home() {
  const fases = [1, 2, 3, 4];
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Seção Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
            Transformação em 4 Fases
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Recupere sua autoestima e <br />
            <span className="text-green-600 underline">emagreça com saúde</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Um método completo com vídeos, áudios e suporte total para você alcançar o corpo que deseja em tempo recorde.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-green-700 transition transform hover:scale-105 shadow-lg">
              QUERO COMEÇAR AGORA
            </button>
            <button className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition">
              SAIBA MAIS
            </button>
          </div>
        </div>
      </section>

      {/* Seção das Fases (Resumo) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          {fases.map((fase) => (
            <div key={fase} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                {fase}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Fase {fase}</h3>
              <p className="text-gray-600 text-sm">Descrição rápida do que o cliente vai aprender nesta etapa do método.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}