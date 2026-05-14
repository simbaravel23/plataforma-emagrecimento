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
              <span className="text-2xl font-black tracking-tighter text-white group-hover:text-[#167abc] transition-colors">
                PROJETO DE EMAGRECIMENTO <span className="text-[#167abc] border border-[#167abc] px-1 rounded group-hover:text-white group-hover:border-white">REGENERAR</span>
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
            
            <Link 
              to="/login" 
              className="text-white text-sm font-bold border-b-2 border-transparent hover:border-[#167abc] pb-1 transition-all"
            >
              Entrar
            </Link>
            
            <Link 
              to="/matricula" 
              className="bg-[#167abc] text-white px-6 py-2 rounded-md text-sm font-black uppercase hover:bg-[#1a8cd8] transition shadow-lg shadow-blue-900/20"
            >
              Matricule-se
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}