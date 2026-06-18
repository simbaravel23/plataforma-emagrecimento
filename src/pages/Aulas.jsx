import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import modulos from '../data/modulos';

export default function Aulas() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').toLowerCase().trim();

  const todasAulas = modulos.flatMap((m) => m.aulas.map((a) => ({ ...a, moduloTitulo: m.titulo })));

  const resultados = query
    ? todasAulas.filter(
        (a) =>
          a.titulo.toLowerCase().includes(query) ||
          a.texto.toLowerCase().includes(query) ||
          (a.moduloTitulo && a.moduloTitulo.toLowerCase().includes(query))
      )
    : [];

  return (
    <div className="min-h-screen bg-[#051933] text-white">
      <Header />

      <main className="pt-24 p-6 max-w-4xl mx-auto">
        <div className="bg-[#041224] rounded-2xl p-8 border border-white/10">
          <h1 className="text-3xl font-black mb-4">Aulas</h1>
          <p className="mb-4 text-white/80">Playlist de aulas recomendada:</p>

          <div className="mb-6">
            <a
              href="https://www.youtube.com/watch?v=D7TtQ1YobDU&list=PLb-nk0DIItRAEnVbgQDDPo64x6yI2oBe9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#167abc] px-4 py-2 rounded font-bold"
            >
              Abrir playlist no YouTube
            </a>
          </div>

          {query && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Resultados para “{query}”</h2>
              {resultados.length === 0 && <p className="text-white/60">Nenhum resultado encontrado.</p>}
              <ul className="space-y-3">
                {resultados.map((a) => (
                  <li key={a.id} className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <Link to={`/aula/${a.id}`} className="font-bold text-white block mb-1">{a.titulo}</Link>
                    <p className="text-sm text-white/60">{a.texto}</p>
                    <p className="text-xs text-white/40 mt-1">{a.moduloTitulo}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="aspect-video bg-black rounded overflow-hidden border border-white/10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/videoseries?list=PLb-nk0DIItRAEnVbgQDDPo64x6yI2oBe9"
              title="Playlist de Aulas"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}
