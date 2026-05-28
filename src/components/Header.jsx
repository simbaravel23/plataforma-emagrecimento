import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed w-full bg-[#051933] border-b border-[#167abc]/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Lado Esquerdo: Logo e Links Principais */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center group">
    {/* Mudamos para text-lg no mobile e text-2xl no desktop (md:) */}
    <span className="mt-5 mb-8 text-sm md:text-2xl font-black tracking-tighter text-white group-hover:text-[#167abc] transition-colors flex flex-wrap items-center gap-x-2 gap-y-1">
      MÉTODO DE EMAGRECIMENTO{" "}
      <span className="text-[#167abc] border border-[#167abc] px-1 rounded group-hover:text-white group-hover:border-white inline-block md:text-center items-center-safe">
        REGENERAR
      </span>
    </span>
  </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition">
                Aulas
              </Link>
              <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition">
                Planos
              </Link>
              <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition">
                Dicas
              </Link>
            </nav>
          </div>

          {/* Lado Direito: Busca e Acesso */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:block relative">
              <input 
                type="text" 
                placeholder="Por onde quer começar ?" 
                className="bg-[#041224] border border-[#167abc]/50 text-sm text-white px-4 py-2 rounded-md w-64 focus:outline-none focus:border-blue-400"
              />
            </div>
            
       <div className="flex items-center gap-2 sm:gap-4"> {/* Container para controlar o espaçamento entre eles */}
  <Link 
    to="/auth?mode=login" 
    className="text-white text-xs sm:text-sm font-bold border-b-2 border-transparent hover:border-[#167abc] pb-1 transition-all"
  >
    Entrar
  </Link>
  
  <Link 
    to="/auth?mode=register" 
    className="bg-[#167abc] text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-md text-xs sm:text-sm font-black uppercase hover:bg-[#1a8cd8] transition shadow-lg shadow-blue-900/20 whitespace-nowrap"
  >
    Matricule-se
  </Link>
</div>
          </div>

        </div>
      </div>
    </header>
  );
}