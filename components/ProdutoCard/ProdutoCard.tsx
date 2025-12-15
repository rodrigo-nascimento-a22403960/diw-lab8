"use client"

import Link from "next/link"
import { Produto, resolveImageUrl } from "@/lib/deisishop"

type Props = {
  produto: Produto
  onAddToCart?: (p: Produto) => void
  onRemoveFromCart?: (id: number) => void
  inCart?: boolean
}

export default function ProdutoCard({
  produto,
  onAddToCart,
  onRemoveFromCart,
  inCart,
}: Props) {
  const nome = produto.title ?? `Produto #${produto.id}`
  const preco = produto.price ?? ""
  const img = resolveImageUrl(produto.image)

  return (
  <div className="rounded-2xl bg-blue-300/60 p-4 hover:bg-blue-300 transition text-slate-900">
    <div className="flex items-start justify-between gap-3">
      <div className="font-extrabold text-lg leading-tight">{nome}</div>

      <Link
        href={`/produtos/${produto.id}`}
        className="rounded-xl bg-white/80 px-3 py-1 text-sm font-semibold text-slate-900 hover:bg-white"
      >
        +info
      </Link>
    </div>

    {img ? (
      <img
        src={img}
        alt={nome}
        className="mt-2 h-40 w-full object-contain bg-white/80 rounded-xl"
        loading="lazy"
      />
    ) : (
      <div className="mt-2 h-40 w-full bg-white/70 rounded-xl grid place-items-center text-slate-700">
        sem imagem
      </div>
    )}

    <div className="mt-3 text-base font-bold text-slate-900">
      {preco ? `${preco} €` : ""}
    </div>

    <div className="mt-3 flex gap-2">
      {!inCart ? (
        <button
          onClick={() => onAddToCart?.(produto)}
          className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
        >
          Adicionar ao carrinho
        </button>
      ) : (
        <button
          onClick={() => onRemoveFromCart?.(produto.id)}
          className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500"
        >
          Remover do carrinho
        </button>
      )}
    </div>
  </div>
)
}
