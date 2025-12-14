import Link from "next/link"
import { caracteristicas } from "@/app/data/caracteristicas"

export default function CaracteristicaPage({
  params,
}: {
  params: { index: string }
}) {
  const index = Number(params.index)

  if (Number.isNaN(index) || index < 0 || index >= caracteristicas.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="font-bold">Característica não encontrada</p>
        <Link className="underline" href="/caracteristicas">
          Voltar
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="bg-blue-300 rounded-2xl p-6 max-w-xl text-center">
        <p className="font-bold text-lg">{caracteristicas[index]}</p>
      </div>

      <Link className="underline" href="/caracteristicas">
        Voltar
      </Link>
    </div>
  )
}
