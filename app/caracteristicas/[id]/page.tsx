// app/caracteristica/[id]/page.tsx
import Caracteristica, { TCaracteristica } from "@/components/Caracteristica";
import Link from "next/link";

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

export default function CaracteristicaPage({
  params,
}: {
  params: { id: string };
}) {
  const index = Number(params.id);

  if (isNaN(index) || index < 0 || index >= caracteristicas.length) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p>Característica não encontrada.</p>
      </main>
    );
  }

  const car = caracteristicas[index];

  return (
    <main className="min-h-screen bg-blue-200 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl p-8 rounded-3xl max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Detalhe da Característica</h2>

        <p className="text-lg mb-6">{car.texto}</p>

        <Link
          href="/caracteristicas"
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Voltar às características
        </Link>
      </div>
    </main>
  );
}
