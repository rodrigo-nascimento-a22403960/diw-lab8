"use client"

import { useEffect, useState } from "react"
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard"
import { Produto } from "@/lib/deisishop"

const LS_REMOVED = "removedProductIds"

function getRemoved(): Set<number> {
  try {
    const raw = localStorage.getItem(LS_REMOVED)
    const arr = raw ? (JSON.parse(raw) as unknown) : []
    const list = Array.isArray(arr) ? arr : []
    return new Set(list.map((x) => Number(x)).filter((n) => Number.isFinite(n)))
  } catch {
    return new Set()
  }
}

export default function ProdutosList({
  produtos,
  cartIds,
  onAddToCart,
  onRemoveFromCart,
}: {
  produtos: Produto[]
  cartIds?: Set<number>
  onAddToCart?: (p: Produto) => void
  onRemoveFromCart?: (id: number) => void
}) {
  const [removed, setRemoved] = useState<Set<number>>(new Set())

  useEffect(() => {
    setRemoved(getRemoved())
  }, [])

  const visiveis = produtos.filter((p) => !removed.has(p.id))

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {visiveis.map((p) => {
        const inCart = cartIds?.has(p.id) ?? false
        return (
          <ProdutoCard
            key={p.id}
            produto={p}
            inCart={inCart}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
          />
        )
      })}
    </div>
  )
}
