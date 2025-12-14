import Image from "next/image"

type Tecnologia = {
  title: string
  image: string
  description: string
  rating: number
}

export interface TecnologiaDetailsCardProps {
  tecnologia: Tecnologia
}

export default function TecnologiaDetailsCard({ tecnologia }: TecnologiaDetailsCardProps) {
  return (
    <div className="bg-blue-300 p-4 rounded-2xl mt-4 flex gap-4 items-center">
      <Image
        src={`/tecnologias/${tecnologia.image}`}
        alt={`Logotipo do ${tecnologia.title}`}
        width={90}
        height={90}
      />

      <div>
        <p className="font-bold">{tecnologia.title}</p>
        <p>{tecnologia.description}</p>
        <p>Rating: {tecnologia.rating}</p>
      </div>
    </div>
  )
}
