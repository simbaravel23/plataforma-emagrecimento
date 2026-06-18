const modulos = [
  {
    id: 1,
    titulo: 'Módulo 1 • Estado inicial',
    descricao: 'Primeiros passos e rotina de aquecimento.',
    explicacaoFase: {
      objetivo: 'Quebrar a inércia, vencer crenças limitantes e construir o hábito da constância microscópica — fazer o mínimo é melhor do que não fazer nada.',
      alimentacao: 'Eliminar alimentos industrializados e doces. Fazer a última refeição (jantar) até, no máximo, às 19h.',
      treinoFisico: 'Circuito diário simples para criar regularidade e proteger a coluna: alongamento + 5–10 flexões + 10–20 segundos de prancha + 300 golpes/socos (no ar ou em aparelho).',
      treinoMental: 'Dedicar os primeiros 5 minutos da manhã para oração e reprogramação mental com mantras curtos: "Eu sou forte, eu sou capaz. Eu sou magro, eu sou saudável."'
    },
    aulas: [
      { id: 1, titulo: 'Explicação e Introdução', tipo: 'Introdução', videoUrl: 'https://www.youtube.com/embed/PyX99jpdh2o', texto: 'Conheça a estrutura do programa e como tirar o máximo proveito das aulas.' },
      { id: 2, titulo: 'Alongamento com Treino Mental', tipo: 'Alongamento', videoUrl: 'https://www.youtube.com/embed/6-v6moKFIqs', texto: 'Rotina leve para preparar o corpo e a mente antes dos treinos mais intensos.' },
      { id: 3, titulo: 'Flexão e Prancha ', tipo: 'Bem-estar', videoUrl: 'https://www.youtube.com/embed/YwCf0E9HvzQ', texto: 'Exercício de força focado no core e membros superiores sem apoios adicionais.' },
      { id: 5, titulo: 'Exercícios de Socos no Aparelho', tipo: 'Bem-estar', videoUrl: 'https://www.youtube.com/embed/2YGAkWZaNrI', texto: 'Treino de braços e agilidade utilizando o aparelho para absorção de impacto.' },
      { id: 6, titulo: 'Exercícios de Socos no Ar', tipo: 'Bem-estar', videoUrl: 'https://www.youtube.com/embed/KdClCJVFNOc', texto: 'Treino de cardio com socos.' },
    ],
  },
  {
    id: 2,
    titulo: 'Módulo 2 • A cura pelo som',
    descricao: 'Aulas de treino localizadas para força e resistência.',
    explicacaoFase: {
      objetivo: 'Aumentar o gasto calórico basal e utilizar estímulos sonoros para reduzir o estresse e melhorar o foco.',
      alimentacao: 'Manter o jantar até às 19h. Opcionalmente experimentar jejum matinal: pela manhã consumir água e café sem açúcar para adaptar-se ao jejum.',
      treinoFisico: 'Elevar a meta calistênica: 10–20 flexões + 20–30 segundos de prancha + 600 socos diários. Incluir exercícios com pesos 2–3 vezes por semana: 3 séries de 15 repetições (rosca direta, elevação lateral, remada, agachamento, stiff).',
      treinoMental: 'Usar fones de ouvido para ouvir tons ou aplicativos com frequências como 432 Hz e 741 Hz; combinações binaurais podem ser usadas durante alongamento ou jejum matinal. Vídeo de alongamento com treino mental e frequências sonoras: https://www.youtube.com/shorts/6-v6moKFIqs.'
    },
    aulas: [
      { id: 7, titulo: 'Explicacao fase 2', tipo: 'Exercícios', videoUrl: 'https://www.youtube-nocookie.com/embed/4kLX6DLsTrg?si=G9wDONHdzvveI_4N', texto: 'Orientacoes sobre as mudancas na fase 2.' },
      { id: 8, titulo: 'Exercicios adicionais com pesos', tipo: 'Exercícios', videoUrl: 'https://www.youtube.com/embed/7OmUIRnACZU?si=xWkpq--uDXqtSOez', texto: 'Sequência de exercícios para fortalecer os músculos com o uso de pesos.' },
      { id: 13, titulo: 'Alongamento com treino mental e frequências', tipo: 'Alongamento', videoUrl: 'https://www.youtube.com/embed/6-v6moKFIqs', texto: 'Alongamento combinado com treino mental e frequências sonoras.' },
      { id: 14, titulo: 'Treino de socos - fase 2', tipo: 'Bem-estar', videoUrl: 'https://www.youtube.com/embed/AbT6QE5qraY?si=DnHQGvXPp6Rq5fts', texto: 'Treino de socos para resistência, técnica e condicionamento.' },
      
    ],
  },
  {
    id: 3,
    titulo: 'Módulo 3 • Cura pela natureza',
    descricao: 'Rotinas para recuperação activa e relaxamento.',
    explicacaoFase: {
      objetivo: 'Romper o platô biológico por meio da ativação metabólica, rotinas naturais e treinos intensificados.',
      alimentacao: 'Manter o jejum matinal e jantar até às 19h. Protocolo matinal opcional: água com limão, pitada de sal integral e canela. Pode-se usar água de cravo-da-índia ocasionalmente.',
      treinoFisico: 'Aumentar a intensidade: 30 flexões + 40 segundos de prancha + 800–1000 socos por sessão. Manter musculação e, 1–2 vezes por semana, focar em membros inferiores e core (elevação pélvica com peso, abdução de pernas, elevação lateral de pernas).',
      treinoMental: 'Praticar gratidão antecipada e meditações diárias; utilizar áudios de relaxamento ou frequências que ajudem na concentração.'
    },
    aulas: [
      { id: 9, titulo: 'Cura pela natureza - fase 3', tipo: 'Recuperação', videoUrl: 'https://www.youtube.com/embed/SKgqxhchYt0?si=5RYs1fSBsLLYDYOl', texto: 'Técnicas para aliviar tensões e acelerar a recuperação muscular.' },
      { id: 10, titulo: 'Exercícios de fortalecimento de pernas e core', tipo: 'Alongamento', videoUrl: 'https://www.youtube.com/embed/Zvk4A-wOVRs?si=2w1c6J6HJswkxVri', texto: 'Sequência para ganhar elasticidade e reduzir dores após o treino.' },
      { id: 15, titulo: 'Treino com pesos — mais repetições', tipo: 'Exercícios', videoUrl: 'https://www.youtube.com/embed/bKApydbVBd0?si=dgGNtwRpMekYptrq', texto: 'Treino com pesos com foco em maior volume e repetições.' },
      { id: 19, titulo: 'Alongamento com treino mental e frequências', tipo: 'Alongamento', videoUrl: 'https://www.youtube.com/embed/6-v6moKFIqs', texto: 'Alongamento combinado com treino mental e frequências sonoras.' },
      { id: 17, titulo: 'Treino de socos', tipo: 'Exercícios', videoUrl: 'https://www.youtube.com/embed/pWMgrZxWqVw', texto: 'Treino adicional disponível neste vídeo.' },
    ],
  },
  {
    id: 4,
    titulo: 'Módulo 4 • Mentalidade e mindset',
    descricao: 'Meditações e hábitos para sustentar sua transformação.',
    explicacaoFase: {
      objetivo: 'Desenvolver mentalidade e hábitos para sustentar a transformação física e mental.',
      alimentacao: 'Eliminar açúcar refinado, farinha branca e fast-food. Em dias específicos, pode-se testar protocolos alimentares mais restritos, sempre com cuidado e acompanhamento.',
      treinoFisico: 'Buscar alta performance: 40 flexões + 50 segundos de prancha + 1000 socos integrados. Manter musculação pesada e treinos de perna/core 2–3 vezes por semana (3 séries de 20 repetições).',
      treinoMental: 'Usar áudios de auto-hipnose e visualização para reforçar metas. Praticar pilares como visão clara, consistência, calma sob pressão e crença positiva.'
    },
    aulas: [
      { id: 11, titulo: 'Mindset de sucesso fase 4', tipo: 'Mindset', videoUrl: 'https://www.youtube.com/embed/EVPFM6yqF4s?si=w9Lg5-B0SBsJhMhi', texto: 'Aprenda um exercício simples para acalmar a mente antes e depois do treino.' },
      { id: 18, titulo: 'Treino de socos', tipo: 'Exercícios', videoUrl: 'https://www.youtube.com/embed/pWMgrZxWqVw', texto: 'Treino adicional disponível neste vídeo.' },
      { id: 20, titulo: 'Alongamento com treino mental e frequências', tipo: 'Alongamento', videoUrl: 'https://www.youtube.com/embed/6-v6moKFIqs', texto: 'Alongamento combinado com treino mental e frequências sonoras.' },
      { id: 17, titulo: 'Treino de socos', tipo: 'Exercícios', videoUrl: 'https://www.youtube.com/embed/pWMgrZxWqVw', texto: 'Treino adicional disponível neste vídeo.' },
    ],
  },
];

export default modulos;
