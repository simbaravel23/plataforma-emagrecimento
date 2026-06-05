import React, { useState } from 'react';
import Header from '../components/Header';

const modulos = [
  {
    id: 1,
    titulo: 'Módulo 1 • Estado inicial',
    descricao: 'Primeiros passos e rotina de aquecimento.',
    // Conteúdo da Fase 1 inserido aqui
    explicacaoFase: {
      objetivo: 'Quebrar a inércia, vencer as crenças limitantes iniciais e construir o hábito da constância microscópica (fazer o mínimo é infinitamente melhor do que não fazer nada).',
      alimentacao: 'Eliminar completamente alimentos embutidos e doces. Encerrar a última refeição (jantar) impreterivelmente até as 19h.',
      treinoFisico: 'Circuito diário simples focado em criar regularidade e proteger a coluna: Alongamento estruturado + 5 a 10 repetições de Flexão de braço + 10 a 20 segundos de Prancha isométrica + 300 golpes/socos (no ar ou em aparelho).',
      treinoMental: 'Dedicar os primeiros 5 minutos da manhã para oração e reprogramação subconsciente com mantras primitivos repetidos mentalmente: "Eu sou forte, eu sou capaz. Eu sou magro, eu sou saudável!" e "Eu estou cada vez mais magro e saudável, independente das circunstâncias."'
    },
    aulas: [
      { id: 1, titulo: 'Explicação e Introdução', tipo: 'Introdução', videoUrl: 'https://www.youtube.com/embed/l4BbL176NEA', texto: 'Conheça a estrutura do programa e como tirar o máximo proveito das aulas.' },
      { id: 2, titulo: 'Alongamento com Treino Mental', tipo: 'Alongamento', videoUrl: 'https://www.youtube.com/embed/17k8IZC_YNI', texto: 'Rotina leve para preparar o corpo e a mente antes dos treinos mais intensos.' },
      { id: 3, titulo: 'Flexão e Prancha sem Apoio', tipo: 'Bem-estar', videoUrl: 'https://www.youtube.com/embed/slmWjDCdZRE', texto: 'Exercício de força focado no core e membros superiores sem apoios adicionais.' },
      { id: 4, titulo: 'Flexão de Braço com Apoio e Prancha', tipo: 'Bem-estar', videoUrl: 'https://www.youtube.com/embed/QhS_RKCh03g', texto: 'Versão adaptada do exercício para ganho de estabilidade e força controlada.' },
      { id: 5, titulo: 'Exercícios de Socos no Aparelho', tipo: 'Bem-estar', videoUrl: 'https://www.youtube.com/embed/bU3ArMzuJIU', texto: 'Treino de braços e agilidade utilizando o aparelho para absorção de impacto.' },
      { id: 6, titulo: 'Exercícios de Socos no Ar', tipo: 'Bem-estar', videoUrl: 'https://www.youtube.com/embed/ONzgHRuVzX4?si=xTZUnzFUFLs2UOFK', texto: 'Treino de cardio com socos.' },
    ],
  },
  {
    id: 2,
    titulo: 'Módulo 2 • A cura pelo som',
    descricao: 'Aulas de treino localizadas para força e resistência.',
    // Conteúdo da Fase 2 inserido aqui
    explicacaoFase: {
      objetivo: 'Potencializar a queima calórica basal e utilizar frequências sonoras puras para blindar a mente e reduzir o cortisol (hormônio do estresse).',
      alimentacao: 'Manter a meta de jantar até as 19h e dar um passo além: retirar o café da manhã. Pela manhã, consumir exclusivamente água e café puro sem açúcar para se adaptar ao jejum matinal consciente.',
      treinoFisico: 'Aumentar a meta calistênica: 10 a 20 flexões + 20 a 30 segundos de prancha + 600 socos diários. Adicionar pesos (halteres ou garrafas pet com água/areia): Fazer 3 séries de 15 repetições de Rosca direta, Elevação lateral, Remada, Agachamento, Panturrilha e Stiff (treinar com peso de 2 a 3 vezes por semana ou dia sim, dia não).',
      treinoMental: 'Uso obrigatório de fones de ouvido: Utilizar geradores de tom puro online ou aplicativos para ouvir as frequências de 432 Hz (equilíbrio), 741 Hz (limpeza mental) e a combinação binaural regenerativa de 528 Hz no ouvido esquerdo e 522 Hz no ouvido direito (diferencial de 6 Hz - Ondas Theta) durante o alongamento ou jejum matinal.'
    },
    aulas: [
      { id: 7, titulo: 'Treino para membros inferiores', tipo: 'Exercícios', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Foco em pernas, glúteos e postura para fortalecer a base do corpo.' },
      { id: 8, titulo: 'Core e estabilidade', tipo: 'Exercícios', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Sequência para abdômen e lombar com exercícios acessíveis.' },
    ],
  },
  {
    id: 3,
    titulo: 'Módulo 3 • Cura pela natureza',
    descricao: 'Rotinas para recuperação activa e relaxamento.',
    // Conteúdo da Fase 3 inserido aqui
    explicacaoFase: {
      objetivo: 'Romper o platô biológico (estagnação de resultados) através da ativação metabólica com elixires naturais e treinos físicos intensificados.',
      alimentacao: 'Manter o jejum matinal e o jantar até as 19h. Protocolo de Elixires e Shots Matinais: Beber todas as manhãs em jejum uma pitada de sal integral com água (repõe eletrólitos) + limão espremido na hora + canela em pó. Consumir também água de cravo-da-índia (deixada de molho de um dia para o outro). Infusão Noturna: Em dias específicos, tomar um chá relaxante e imunomodulador de alho, camomila e cravo antes de dormir.',
      treinoFisico: 'Subir o nível calistênico: 30 flexões de braço + 40 segundos de prancha isométrica (sem errar nenhum dia) + 800 a 1000 socos por sessão. Manter as séries de musculação e adicionar de 1 a 2 vezes por semana foco em membros inferiores e core: Elevação pélvica com peso, abertura de perna deitado e elevação lateral de pernas.',
      treinoMental: 'Aplicar a Teoria das Ondas (Gratidão Antecipada) durante os treinos, repetindo e sentindo como se a meta já estivesse cumprida: "Deus, obrigado por me fazer mais magro, saudável e atingir meus objetivos." Introduzir meditações diárias com a frequência da abundância (888 Hz).'
    },
    aulas: [
      { id: 9, titulo: 'Liberação miofascial', tipo: 'Recuperação', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Técnicas para aliviar tensões e acelerar a recuperação muscular.' },
      { id: 10, titulo: 'Alongamento profundo', tipo: 'Alongamento', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Sequência para ganhar elasticidade e reduzir dores após o treino.' },
    ],
  },
  {
    id: 4,
    titulo: 'Módulo 4 • Mentalidade e mindset',
    descricao: 'Meditações e hábitos para sustentar sua transformação.',
    // Conteúdo da Fase 4 inserido aqui
    explicacaoFase: {
      objetivo: 'Alcançar a máxima performance física e mental, derretendo a gordura aparente através de um protocolo radical e modelagem comportamental de elite.',
      alimentacao: 'Abandono radical e total de açúcar, farinha branca e fast-food. Introdução em dias específicos de um jejum avançado de 23 horas (fazer apenas uma refeição estrita no dia) associado ao consumo do shot de babosa purificada (livre de aloína) com alho e gengibre.',
      treinoFisico: 'Atingir o topo da performance individual: 40 flexões de braço + 50 segundos de prancha isométrica + 1000 socos integrados. Manter la musculação pesada e os treinos de perna/core de 2 a 3 vezes na semana (3 séries de 20 repetições).',
      treinoMental: 'Utilizar áudios de auto-hipnose para visualização profunda de metas e superação de dor/obstáculos. Praticar os 4 Pilares dos Grandes Mestres: Desenhar a visão clara do destino final (Arnold), manter a consistência diária obsessiva (Cristiano Ronaldo), agir com relaxamento sob pressão no estado de fluxo (Usain Bolt) e ativar a fé invisível operativa que move a realidade e elimina o medo do amanhã (Jesus Cristo).'
    },
    aulas: [
      { id: 11, titulo: 'Meditação guiada', tipo: 'Mindset', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Aprenda um exercício simples para acalmar a mente antes e depois do treino.' },
      { id: 12, titulo: 'Rotina diária saudável', tipo: 'Hábitos', videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', texto: 'Dicas práticas para criar consistência e manter resultados no longo prazo.' },
    ],
  },
];

const todasAulas = modulos.flatMap((modulo) => modulo.aulas);

export default function Dashboard() {
  const [aulaAtiva, setAulaAtiva] = useState(todasAulas[0]);
  const [moduloAberto, setModuloAberto] = useState(modulos[0].id);

  // Encontra o módulo ao qual a aula ativa pertence
  const moduloDaAulaAtiva = modulos.find((m) => 
    m.aulas.some((aula) => aula.id === aulaAtiva.id)
  );

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

                      {aberto && (
                        <div className="mt-4 pt-3 border-t border-white/10 text-center">
                          <p className="text-[11px] text-white/50 uppercase tracking-wider mb-2">Tire suas dúvidas aqui</p>
                          <a
                            href={`https://wa.me/5515996987980?text=Ol%C3%A1%21+Estou+com+uma+d%C3%BAvida+no+${encodeURIComponent(modulo.titulo)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-4 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#25D366]/10"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.64-1.019-5.123-2.877-6.981-1.857-1.857-4.342-2.878-6.979-2.879-5.449 0-9.886 4.434-9.889 9.885-.001 2.221.612 4.356 1.748 5.972l-.101.515-.675 2.472 2.528-.664.514-.108zM17.43 14.83c-.308-.154-1.82-.9-2.102-1.003-.281-.102-.486-.154-.69.154-.204.308-.791.993-.97 1.199-.179.205-.359.229-.667.075-.307-.153-1.298-.478-2.472-1.526-.913-.815-1.53-1.821-1.71-2.129-.18-.308-.019-.475.135-.629.139-.138.308-.359.461-.539.154-.179.206-.308.308-.513.102-.206.051-.385-.026-.54-.077-.154-.692-1.668-.949-2.284-.25-.601-.504-.52-.69-.53l-.588-.01c-.205 0-.539.077-.821.385-.281.308-1.077 1.051-1.077 2.564 0 1.513 1.102 2.975 1.256 3.181.154.205 2.169 3.311 5.256 4.643.734.316 1.307.505 1.754.647.737.234 1.407.201 1.937.122.59-.088 1.82-.744 2.077-1.462.256-.718.256-1.334.179-1.462-.077-.128-.282-.205-.59-.359z" />
                            </svg>
                            Chamar no WhatsApp
                          </a>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* COMPONENTE DA EXPLICAÇÃO COMPLETA DA FASE ATUAL */}
            {moduloDaAulaAtiva?.explicacaoFase && (
              <div className="bg-[#041224] rounded-[2rem] border border-[#167abc]/30 p-6 lg:p-8 shadow-xl space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  <h3 className="text-sm font-black uppercase tracking-[0.25em] text-[#8ed4ff]">
                    Diretrizes da {moduloDaAulaAtiva.titulo.split('•')[0] || moduloDaAulaAtiva.titulo}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="font-bold text-[#8ed4ff] uppercase tracking-wider mb-1">🎯 Objetivo da Fase</p>
                    <p className="text-white/80 leading-relaxed">{moduloDaAulaAtiva.explicacaoFase.objetivo}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="font-bold text-emerald-400 uppercase tracking-wider mb-1">🥗 Alimentação</p>
                    <p className="text-white/80 leading-relaxed">{moduloDaAulaAtiva.explicacaoFase.alimentacao}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="font-bold text-amber-400 uppercase tracking-wider mb-1">🏋️‍♂️ Treino Físico</p>
                    <p className="text-white/80 leading-relaxed">{moduloDaAulaAtiva.explicacaoFase.treinoFisico}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="font-bold text-purple-400 uppercase tracking-wider mb-1">🧠 Treino Mental</p>
                    <p className="text-white/80 leading-relaxed">{moduloDaAulaAtiva.explicacaoFase.treinoMental}</p>
                  </div>
                </div>
              </div>
            )}

            {/* CARD DA AULA SELECIONADA */}
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

            {/* PLAYER DE VÍDEO E DICAS */}
            <div className="grid gap-8">
              <div className="relative aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
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