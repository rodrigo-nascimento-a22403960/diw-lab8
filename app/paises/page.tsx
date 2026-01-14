"use client"

import useSWR from "swr";
// Importação corrigida (sem .tsx). 
// Confirma se o caminho da pasta bate certo com a tua estrutura.
import CountryCard from "@/components/CountryCard/CountryCard"; 

// Interface para os dados que vêm da API
interface PaisAPI {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  capital?: string[]; // Pode ser undefined
  region: string;
  population: number;
  area: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PaisesPage() {
  const { data, error, isLoading } = useSWR<PaisAPI[]>(
    "https://restcountries.com/v3.1/independent?status=true", 
    fetcher
  );

  if (error) return <div className="p-10 text-red-500 font-bold">Falha ao carregar os países.</div>;
  if (isLoading) return <div className="p-10 text-blue-500 font-bold">A carregar dados...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Lista de Países (Com Componentes)
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((pais, index) => (
          <CountryCard 
            key={index}
            name={pais.name.common}
            region={pais.region}
            // Verifica se existe capital, senão escreve "N/A"
            capital={pais.capital?.[0] || "N/A"}
            population={pais.population}
            area={pais.area}
            // Passar as imagens para o componente
            flag={pais.flags.svg}
            flagAlt={pais.flags.alt || `Bandeira de ${pais.name.common}`}
          />
        ))}
      </div>
    </div>
  );
}


/* ================================================================
   GUIA DE ESTUDO (CÁBULA)
   Isto está comentado para não dar erro no teu código.
================================================================

"use client" // [PASSO 1]

import useSWR from "swr"; 

// [PASSO 2] O FETCHER
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CarrosPage() {
  
  // [PASSO 3] O PEDIDO 
  const { data, error, isLoading } = useSWR<any>(
    "https://api-exemplo-carros.com/marcas", 
    fetcher
  );

  // [PASSO 4] PROTEÇÃO CONTRA ERROS
  if (error) return <div>Ocorreu um erro.</div>;
  if (isLoading) return <div>A carregar...</div>;

  // [PASSO 5] O VISUAL (HTML)
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      
      {data?.map((carro: any, index: number) => (
        <div key={index} className="border p-5 rounded shadow">
          
          // [PASSO 6] PREENCHER OS DADOS 
          <h1 className="text-xl font-bold">{carro.marca}</h1> 
          <p>Origem: {carro.pais}</p>
          <p>Criado em: {carro.fundacao}</p>
          <p className="text-blue-500">Top: {carro.topModelo}</p>

        </div>
      ))}
    </div>
  );
}

*/