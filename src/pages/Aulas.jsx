import React from 'react';
import Header from '../components/Header';

export default function Aulas() {
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
