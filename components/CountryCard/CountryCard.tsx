import React from "react";

interface CountryCardProps {
  name: string;
  region: string;
  capital: string;
  population: number;
  area: number;
  // 1. ADICIONA ESTAS DUAS LINHAS:
  flag: string;
  flagAlt: string;
}

export default function CountryCard({ 
  name, 
  region, 
  capital, 
  population, 
  area,
  // 2. RECEBE AS NOVAS PROPS AQUI TAMBÉM:
  flag,
  flagAlt
}: CountryCardProps) {
  return (
    <div className="bg-white text-black rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all">
      
      {/* 3. COLOCA ESTE BLOCO DA IMAGEM NO TOPO DO CARTÃO */}
      <div className="h-40 w-full bg-gray-100 border-b relative">
        <img 
          src={flag} 
          alt={flagAlt} 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="p-6 flex flex-col items-center text-center">
        <h2 className="text-xl font-extrabold text-blue-600 mb-2 uppercase tracking-wide">
          {name}
        </h2>
        {/* ... o resto do teu código igual ... */}
        <p className="text-sm text-gray-500 mb-4 font-semibold">
          {region} • {capital}
        </p>
        
        <div className="w-full space-y-3 bg-gray-50 p-4 rounded-lg">
           <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-500 uppercase">População</span>
            <span className="text-lg font-medium text-gray-800">
              {population.toLocaleString('pt-PT')}
            </span>
          </div>
          <div className="w-full h-px bg-gray-200 my-1"></div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-500 uppercase">Área</span>
            <span className="text-lg font-medium text-gray-800">
              {area.toLocaleString('pt-PT')} <span className="text-sm">km²</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}