// components/ProdutosList/ProdutosList.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { Produto } from "@/lib/deisishop"
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard"

const LS_KEY = "removedProductIds"

function getRemovedIds(): number[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    return arr.map(Number).filter((n) => Number.isFinite(n))
  } catch {
    return []
  }
}

export default function ProdutosList({ produtos }: { produtos: Produto[] }) {
  const [removed, setRemoved] = useState<number[]>([])

  useEffect(() => {
    setRemoved(getRemovedIds())
  }, [])

  const visiveis = useMemo(() => {
    const set = new Set(removed)
    return produtos.filter((p) => !set.has(Number(p.id)))
  }, [produtos, removed])

  if (visiveis.length === 0) {
    return <p className="opacity-80">Sem produtos para mostrar.</p>
  }

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {visiveis.map((p) => (
        <ProdutoCard key={p.id} produto={p} />
      ))}
    </div>
  )
}
