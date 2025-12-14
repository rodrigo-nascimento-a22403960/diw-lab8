import Link from "next/link"
import TecnologiaCard from "@/components/TecnologiaCard/TecnologiaCard"

export interface TecnologiaProps {
  index: number
  title: string
  image: string
}

export default function Tecnologia({ index, title, image }: TecnologiaProps) {
  return (
    <Link href={`/tecnologia/${index}`}>
      <TecnologiaCard title={title} image={image} />
    </Link>
  )
}
