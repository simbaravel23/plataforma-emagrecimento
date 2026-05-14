import React, { useState } from 'react';
import Header from '../components/Header';

const aulas = [
  { id: 1, categoria: "Exercícios", titulo: "Treino Full Body - Nível 1", videoUrl: "https://www.youtube.com/embed/placeholder1", texto: "Este treino foca em grandes grupos musculares. Repita 3 vezes." },
  { id: 2, categoria: "Alongamento", titulo: "Mobilidade de Quadril", videoUrl: "https://www.youtube.com/embed/placeholder2", texto: "Essencial para quem passa muito tempo sentado. Mantenha cada posição por 30s." },
  { id: 3, categoria: "Meditação", titulo: "Foco 528Hz - Frequência Bio", videoUrl: "https://www.youtube.com/embed/placeholder3", texto: "Utilize fones de ouvido para melhor aproveitamento das frequências binaurais." },
];

export default function Dashboard() {
  const [aulaAtiva, setAulaAtiva] = useState(aulas[0]);

  return (
    <div className="min-h-screen bg-[#051933] text-white">
      <Header />
      
      <div className="flex flex-col lg:flex-row pt-24 min-h-screen">
        
        {/* Sidebar de Aulas - Lista de Reprodução */}
        <aside className="w-full lg:w-96 bg-[#041224] border-r border-white/10 p-6 overflow-y-auto">
          <h2 className="text-xs font-black tracking-widest uppercase mb-8 border-b border-white pb-2 text-white">
            Conteúdo do Módulo
          </h2>
          <div className="space-y-4">
            {aulas.map((aula) => (
              <button
                key={aula.id}
                onClick={() => setAulaAtiva(aula)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  aulaAtiva.id === aula.id 
                  ? "border-white bg-white/10" 
                  : "border-transparent hover:bg-white/5"
                }`}
              >
                <span className="text-[10px] uppercase font-black text-white/60 mb-1 block">
                  {aula.categoria}
                </span>
                <h3 className="font-bold text-sm text-white uppercase leading-tight">
                  {aula.titulo}
                </h3>
              </button>
            ))}
          </div>
        </aside>

        {/* Área Principal - Player e Texto */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            
            {/* Player de Vídeo */}
            <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl mb-10">
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                {/* Aqui entrará o iframe do vídeo */}
                <p className="font-black italic text-2xl uppercase">Player de Vídeo: {aulaAtiva.titulo}</p>
              </div>
              {/* Descomente quando tiver as URLs reais:
              <iframe 
                className="w-full h-full"
                src={aulaAtiva.videoUrl}
                title={aulaAtiva.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> 
              */}
            </div>

            {/* Texto de Apoio */}
            <div className="bg-[#041224] p-8 lg:p-12 rounded-3xl border border-white/10">
              <h1 className="text-3xl lg:text-4xl font-black text-white uppercase italic mb-6">
                {aulaAtiva.titulo}
              </h1>
              <div className="h-1 w-20 bg-white mb-8"></div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-xl leading-relaxed text-white font-medium mb-6">
                  {aulaAtiva.texto}
                </p>
                <div className="p-6 border-l-4 border-white bg-white/5 rounded-r-xl">
                  <h4 className="font-black text-white uppercase text-xs mb-2 tracking-widest">Dica Técnica:</h4>
                  <p className="text-white opacity-80">
                    Lembre-se de manter a respiração controlada durante toda a execução. A consistência é o segredo da transformação.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}