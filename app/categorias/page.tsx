import Link from "next/link"
import { getCategorias } from "@/lib/deisishop"

export default async function CategoriasPage() {
  const categorias = await getCategorias()

  return (
    <div>
      <h2 className="text-xl font-bold">Categorias</h2>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categorias.map((c) => (
          <Link
            key={c.name}
            href={`/categorias/${encodeURIComponent(c.name)}`}
            className="block rounded-2xl bg-blue-300/60 p-4 hover:bg-blue-300"
          >
            <div className="font-bold">{c.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
