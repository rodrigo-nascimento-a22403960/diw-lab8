import Link from "next/link"

export default async function CaracteristicaPage({
  params,
}: {
  params: Promise<{ index: string }>
}) {
  const { index } = await params

  const caracteristicas = [
    "JSX, sintaxe que mistura HTML e JS.",
    "Componentes, funções que retornam JSX.",
    "Componentes Reutilizáveis e Modulares.",
    "Roteamento Automático e APIs.",
    "Hooks: useState, useEffect e useSWR.",
    "Renderização Rápida e SEO Friendly.",
    "TypeScript Seguro e Escalável.",
    "Comunidade Ativa e Popularidade.",
  ]

  const i = Number(index)

  const caracteristica =
    Number.isInteger(i) && i >= 0 && i < caracteristicas.length
      ? caracteristicas[i]
      : undefined

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      {caracteristica ? (
        <div className="bg-blue-300/60 rounded-2xl p-6 max-w-xl text-center">
          <p className="text-lg font-bold">Característica</p>
          <p className="mt-2">{caracteristica}</p>
        </div>
      ) : (
        <p>Característica não encontrada</p>
      )}

      <Link className="underline" href="/caracteristicas">
        Voltar
      </Link>
    </div>
  )
}
