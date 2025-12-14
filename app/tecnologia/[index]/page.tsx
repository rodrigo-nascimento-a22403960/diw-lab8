import Link from "next/link"
import tecnologias from "@/app/data/tecnologias.json"
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard/TecnologiaDetailsCard"

type Tecnologia = {
  title: string
  image: string
  description: string
  rating: number
}

export default async function TecnologiaPage({
  params,
}: {
  params: Promise<{ index: string }>
}) {
  const { index: indexStr } = await params

  const listaTecnologias = tecnologias as Tecnologia[]
  const index = Number.parseInt(indexStr, 10)

  if (Number.isNaN(index) || index < 0 || index >= listaTecnologias.length) {
    return (
      <div>
        <h2>Tecnologia não encontrada</h2>
        <Link href="/tecnologias" className="underline">
          Voltar
        </Link>
      </div>
    )
  }

  const tecnologia = listaTecnologias[index]

  return (
    <div>
      <h2>Detalhes da Tecnologia</h2>

      <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />

      <Link
        href="/tecnologias"
        className="inline-block mt-4 bg-blue-300 px-4 py-2 rounded-xl"
      >
        Voltar
      </Link>
    </div>
  )
}
