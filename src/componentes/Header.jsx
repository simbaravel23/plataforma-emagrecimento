import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
              METODO EMAGRECER
            </Link>
          </div>

          {/* Navegação e Login */}
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="hidden md:block text-gray-600 hover:text-green-600 font-medium transition"
            >
              Início
            </Link>
            <Link 
              to="/login" 
              className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition shadow-md shadow-green-200"
            >
              Área do Aluno
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}