import React, { useState } from 'react';
import Header from '../components/Header';

const modulos = [
  {
    id: 1,
    titulo: 'Módulo 1 • Estado inicial',
    descricao: 'Primeiros passos e rotina de aquecimento.',
    aulas: [
      { 
        id: 1, 
        titulo: 'Explicação e Introdução', 
        tipo: 'Introdução', 
        videoUrl: 'https://www.youtube.com/embed/l4BbL176NEA', 
        texto: 'Conheça a estrutura do programa e como tirar o máximo proveito das aulas.' 
      },
      { 
        id: 2, 
        titulo: 'Alongamento com Treino Mental', 
        tipo: 'Alongamento', 
        videoUrl: 'https://www.youtube.com/embed/17k8IZC_YNI', 
        texto: 'Rotina leve para preparar o corpo e a mente antes dos treinos mais intensos.' 
      },
      { 
        id: 3, 
        titulo: 'Flexão e Prancha sem Apoio', 
        tipo: 'Bem-estar', 
        videoUrl: 'https://www.youtube.com/embed/slmWjDCdZRE', 
        texto: 'Exercício de força focado no core e membros superiores sem apoios adicionais.' 
      },
      { 
        id: 4, 
        titulo: 'Flexão de Braço com Apoio e Prancha', 
        tipo: 'Bem-estar', 
        videoUrl: 'https://www.youtube.com/embed/QhS_RKCh03g', 
        texto: 'Versão adaptada do exercício para ganho de estabilidade e força controlada.' 
      },
      
      { 
        id: 5, 
        titulo: 'Exercícios de Socos no Aparelho', 
        tipo: 'Bem-estar', 
        videoUrl: 'https://www.youtube.com/embed/bU3ArMzuJIU', 
        texto: 'Treino de braços e agilidade utilizando o aparelho para absorção de impacto.' 
      },
      { 
        id: 6, 
        titulo: 'Exercícios de Socos no Ar', 
        tipo: 'Bem-estar', 
        videoUrl: 'https://www.youtube.com/embed/ONzgHRuVzX4?si=xTZUnzFUFLs2UOFK', 
        texto: 'Treino de cardio com socos.' 
      },
    ],
  },
  {
    id: 2,
    titulo: 'Módulo 2 • A cura pelo som',
    descricao: 'Aulas de treino localizadas para força e resistência.',
    aulas: [
      { id: 6, titulo: 'Treino para membros inferiores', tipo: 'Exercícios', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Foco em pernas, glúteos e postura para fortalecer a base do corpo.' },
      { id: 7, titulo: 'Core e estabilidade', tipo: 'Exercícios', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Sequência para abdômen e lombar com exercícios acessíveis.' },
    ],
  },
  {
    id: 3,
    titulo: 'Módulo 3 • Cura pela natureza',
    descricao: 'Rotinas para recuperação activa e relaxamento.',
    aulas: [
      { id: 8, titulo: 'Liberação miofascial', tipo: 'Recuperação', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Técnicas para aliviar tensões e acelerar a recuperação muscular.' },
      { id: 9, titulo: 'Alongamento profundo', tipo: 'Alongamento', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Sequência para ganhar elasticidade e reduzir dores após o treino.' },
    ],
  },
  {
    id: 4,
    titulo: 'Módulo 4 • Mentalidade e mindset',
    descricao: 'Meditações e hábitos para sustentar sua transformação.',
    aulas: [
      { id: 10, titulo: 'Meditação guiada', tipo: 'Mindset', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Aprenda um exercício simples para acalmar a mente antes e depois do treino.' },
      { id: 11, titulo: 'Rotina diária saudável', tipo: 'Hábitos', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Dicas práticas para criar consistência e manter resultados no longo prazo.' },
    ],
  },
];

const todasAulas = modulos.flatMap((modulo) => modulo.aulas);

export default function Dashboard() {
  const [aulaAtiva, setAulaAtiva] = useState(todasAulas[0]);
  const [moduloAberto, setModuloAberto] = useState(modulos[0].id);

  return (
    <div className="min-h-screen bg-[#051933] text-white">
      <Header />

      <div className="flex flex-col lg:flex-row pt-24 min-h-screen">
        <aside className="w-full lg:w-96 bg-[#041224] border-r border-white/10 p-6 overflow-y-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-black uppercase tracking-[0.35em] text-white mb-2">Aulas</h2>
            <p className="text-sm text-white/70">Escolha um módulo e selecione a aula para começar.</p>
          </div>

          <div className="space-y-4">
            {modulos.map((modulo) => {
              const aberto = moduloAberto === modulo.id;
              return (
                <div key={modulo.id} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setModuloAberto(aberto ? null : modulo.id)}
                    className="w-full flex items-center justify-between gap-4 p-4 text-left"
                  >
                    <div>
                      <h3 className="text-sm font-black uppercase text-[#8ed4ff]">{modulo.titulo}</h3>
                      <p className="text-[11px] text-white/50 mt-1">{modulo.descricao}</p>
                    </div>
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition ${aberto ? 'bg-[#167abc] text-white' : 'bg-white/5 text-white/70'}`}>
                      {aberto ? '-' : '+'}
                    </span>
                  </button>

                  <div className={`${aberto ? 'max-h-screen py-3' : 'max-h-0'} overflow-hidden transition-all duration-300 px-4`}>
                    <div className="space-y-2">
                      {aberto && modulo.aulas.map((aula) => (
                        <button
                          key={aula.id}
                          onClick={() => setAulaAtiva(aula)}
                          className={`w-full text-left rounded-2xl px-4 py-3 border transition-all ${
                            aulaAtiva.id === aula.id
                              ? 'border-[#167abc] bg-[#167abc]/15 text-white'
                              : 'border-transparent hover:bg-white/5 text-white/80'
                          }`}
                        >
                          <p className="text-[11px] uppercase tracking-[0.25em] font-black mb-1">{aula.tipo}</p>
                          <p className="font-semibold text-sm leading-snug">{aula.titulo}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-[#041224] rounded-[2rem] border border-white/10 p-6 lg:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs uppercase text-white/50 tracking-[0.3em] mb-2">Aula selecionada</p>
                  <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">{aulaAtiva.titulo}</h1>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#167abc]/20 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#8ed4ff] font-black">
                  {aulaAtiva.tipo}
                </span>
              </div>
              <p className="mt-6 text-sm text-white/70 leading-relaxed">{aulaAtiva.texto}</p>
            </div>

            <div className="grid gap-8">
              <div className="relative aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                {/* Aqui está o Iframe corrigido com parâmetros de segurança para o Render */}
                <iframe
                  className="w-full h-full"
                  src={`${aulaAtiva.videoUrl}?modestbranding=1&rel=0&showinfo=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                  title={aulaAtiva.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="bg-[#041224] rounded-[2rem] border border-white/10 p-8">
                <h2 className="text-2xl font-black text-white mb-4">O que você vai aprender</h2>
                <ul className="space-y-4 text-sm text-white/80">
                  <li className="rounded-2xl bg-white/5 p-4 border border-white/5">
                    <strong className="text-white">Objetivo:</strong> Execute a aula com foco na técnica correta e perceba a evolução já nas próximas sessões.
                  </li>
                  <li className="rounded-2xl bg-white/5 p-4 border border-white/5">
                    <strong className="text-white">Dica:</strong> Assista ao vídeo com atenção e repita os movimentos no ritmo do instrutor.
                  </li>
                  <li className="rounded-2xl bg-white/5 p-4 border border-white/5">
                    <strong className="text-white">Próximos passos:</strong> Depois da aula, faça uma breve anotação sobre como se sentiu para ajustar seu progresso.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}