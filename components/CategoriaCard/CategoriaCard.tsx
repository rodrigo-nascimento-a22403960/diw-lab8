import Link from "next/link"

export type Categoria = {
  id: number | string
  title?: string
  name?: string
  logo?: string
  image?: string
}

export default function CategoriaCard({ categoria }: { categoria: Categoria }) {
  const nome = categoria.title ?? categoria.name ?? "Categoria"
  const img = categoria.logo ?? categoria.image ?? ""

  return (
    <Link
      href={`/categoria/${categoria.id}`}
      className="bg-white/30 rounded-2xl p-4 hover:bg-white/40 transition flex items-center gap-3"
    >
      {img ? (
        <img
          src={img}
          alt={nome}
          className="w-12 h-12 object-contain rounded-xl bg-white/40"
        />
      ) : (
        <div className="w-12 h-12 rounded-xl bg-white/40 grid place-items-center">
          🏷️
        </div>
      )}
      <span className="font-semibold">{nome}</span>
    </Link>
  )
}
