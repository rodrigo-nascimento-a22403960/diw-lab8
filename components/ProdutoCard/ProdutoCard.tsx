"use client"

import Link from "next/link"
import { Produto, resolveImageUrl } from "@/lib/deisishop"
import ContadorPersonalizado from "@/components/ContadorPersonalizado/ContadorPersonalizado"
import { useEffect, useMemo, useState } from "react"
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
        <div className="font-extrabold drop-shadow-sm">{nome}</div>

        <Link
          href={`/produtos/${produto.id}`}
          className="rounded-xl bg-white/60 px-3 py-1 text-sm font-semibold hover:bg-white/80"
        >
          +info
        </Link>
      </div>

      {img ? (
        <img
          src={img}
          alt={nome}
          className="mt-2 h-40 w-full object-contain bg-white/70 rounded-xl"
          loading="lazy"
        />
        
      ) : (
        <div className="mt-2 h-40 w-full bg-white/60 rounded-xl grid place-items-center opacity-80">
          sem imagem
        </div>
      )}

      <div className="mt-3 font-bold opacity-90">{preco ? `${preco} €` : ""}</div>

      <div className="mt-3 flex gap-2">
        {!inCart ? (
          <button
            onClick={() => onAddToCart?.(produto)}
            className="rounded-xl bg-slate-900 px-4 py-2 text-white font-semibold hover:bg-slate-800"
          >
            Adicionar ao carrinho
          </button>
        ) : (
          <button
            onClick={() => onRemoveFromCart?.(produto.id)}
            className="rounded-xl bg-red-500/20 px-4 py-2 font-semibold hover:bg-red-500/30"
          >
            Remover do carrinho
          </button>

          const [likes, setLikes] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const raw = localStorage.getItem(storageKey)
    const n = raw ? Number(raw) : 0
    setLikes(Number.isFinite(n) ? n : 0)
  }, [storageKey])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(storageKey, String(likes))
  }, [likes, mounted, storageKey])

  return (
    <button
      type="button"
      onClick={() => setLikes((v) => v + 1)}
      className="bg-white/70 px-3 py-1 rounded-xl font-semibold hover:bg-white transition"
      suppressHydrationWarning
    >
      ❤️ {mounted ? likes : 0}
    </button>
  )
          

          
        )}
        


        

        
        
      </div>
      
      <ContadorPersonalizado title={produto.title} />
      
    </div>
  )
}

