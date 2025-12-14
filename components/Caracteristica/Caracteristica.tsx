import Link from "next/link"

export interface CaracteristicaProps {
  caracteristica: string
  index: number
}

export default function Caracteristica({ caracteristica, index }: CaracteristicaProps) {
  return (
    <Link
      href={`/caracteristica/${index}`}
      className="bg-blue-300 rounded-2xl p-4 hover:opacity-90 transition"
    >
      {caracteristica}
    </Link>
  )
}
