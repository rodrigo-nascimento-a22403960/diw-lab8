// app/caracteristicas/page.tsx
import Caracteristica, { TCaracteristica } from "@/components/Caracteristica";

const caracteristicas: TCaracteristica[] = [
  { texto: "JSX, sintaxe que mistura HTML e JS." },
  { texto: "Componentes, funções que retornam JSX." },
  { texto: "Componentes Reutilizáveis e Modulares." },
  { texto: "Roteamento Automático e APIs." },
  { texto: "Hooks: useState, useEffect e useSWR." },
  { texto: "Renderização Rápida e SEO Friendly." },
  { texto: "TypeScript Seguro e Escalável." },
  { texto: "Comunidade Ativa e Popularidade." },
];

export default function CaracteristicasPage() {
  return (
    <main className="min-h-screen bg-blue-200 py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-white drop-shadow">
        Características do React e Next.js
      </h2>

      <ul className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        {caracteristicas.map((car, i) => (
          <Caracteristica key={i} car={car} index={i} />
        ))}
      </ul>
    </main>
  );
}
