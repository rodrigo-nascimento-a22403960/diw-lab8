import tecnologias from "@/app/data/tecnologias.json"
import Tecnologia from "@/components/Tecnologia/Tecnologia"

type TecnologiaType = {
  title: string
  image: string
  description: string
  rating: number
}

export default function TecnologiasPage() {
  const listaTecnologias = JSON.parse(JSON.stringify(tecnologias)) as TecnologiaType[]

  return (
    <div>
      <h2>Tecnologias Exploradas</h2>

      <div className="mt-4 flex flex-wrap justify-center">
        {listaTecnologias.map((t, i) => {
          return <Tecnologia key={i} index={i} title={t.title} image={t.image} />
        })}
      </div>
    </div>
  )
}
