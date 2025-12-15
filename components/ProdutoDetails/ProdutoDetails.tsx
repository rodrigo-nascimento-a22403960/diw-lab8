"use client"

import Link from "next/link"
import type { Product } from "@/models/interfaces"
import { resolveImageUrl } from "@/lib/deisishop"

export default function ProdutoDetails({ produto }: { produto: Product }) {
  const img = resolveImageUrl(produto.image)

  return (
    <div>
      <h2 className="text-xl font-bold">Detalhes do Produto</h2>

      <div className="mt-2 text-lg font-bold">{produto.title}</div>

      {img ? (
        <img
          src={img}
          alt={produto.title}
          className="mt-3 h-64 w-full object-contain bg-white/60 rounded-2xl"
        />
      ) : null}

      <p className="mt-3 opacity-90">{produto.description}</p>

      <div className="mt-4 text-lg">{produto.price} €</div>

      <div className="mt-2 opacity-90">
        Rating: {produto.rating?.rate} ({produto.rating?.count} votos)
      </div>

      <Link href="/produtos" className="inline-block mt-6 underline">
        Voltar
      </Link>
    </div>
  )
}
