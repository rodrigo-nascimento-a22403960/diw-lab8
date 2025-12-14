"use client"

import Link from "next/link"
import { Produto, resolveImageUrl } from "@/lib/deisishop"

export default function ProdutoCard({ produto }: { produto: Produto }) {
  const nome = produto.title ?? produto.name ?? `Produto #${produto.id}`
  const preco = produto.price ?? produto.preco ?? ""
  const imgRaw =
    produto.image ?? produto.imagem ?? produto.image_url ?? produto.imagem_url ?? ""
  const img = resolveImageUrl(imgRaw)

  return (
    <Link
      href={`/produtos/${produto.id}`} // <-- NÃO É /produto/ (singular)
      className="block rounded-2xl bg-blue-300/60 p-4 hover:bg-blue-300 transition"
    >
      <div className="font-bold">{nome}</div>

      {img ? (
        <img
          src={img}
          alt={nome}
          className="mt-2 h-40 w-full object-contain bg-white/60 rounded-xl"
          loading="lazy"
        />
      ) : (
        <div className="mt-2 h-40 w-full bg-white/60 rounded-xl grid place-items-center opacity-70">
          sem imagem
        </div>
      )}

      <div className="mt-3 opacity-90">{preco ? `${preco} €` : ""}</div>
    </Link>
  )
}
