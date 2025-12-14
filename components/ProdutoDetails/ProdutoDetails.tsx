// components/ProdutoDetails/ProdutoDetails.tsx
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Produto, resolveImageUrl } from "@/lib/deisishop"

const LS_KEY = "removedProductIds"

function addRemoved(id: number) {
  const raw = localStorage.getItem(LS_KEY)
  const arr = raw ? JSON.parse(raw) : []
  const list = Array.isArray(arr) ? arr : []
  const set = new Set(list.map(Number).filter((n) => Number.isFinite(n)))
  set.add(id)
  localStorage.setItem(LS_KEY, JSON.stringify([...set]))
}

function isRemoved(id: number) {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return false
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return false
    return arr.map(Number).includes(id)
  } catch {
    return false
  }
}

export default function ProdutoDetails({ produto }: { produto: Produto }) {
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    setRemoved(isRemoved(Number(produto.id)))
  }, [produto.id])

  const nome = produto.title ?? produto.name ?? `Produto #${produto.id}`
  const desc = produto.description ?? produto.descricao ?? ""
  const preco = produto.price ?? produto.preco ?? ""
  const imgRaw =
    produto.image ?? produto.imagem ?? produto.image_url ?? produto.imagem_url ?? ""
  const img = resolveImageUrl(imgRaw)

  if (removed) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold">Produto removido ✅</h2>
        <Link className="inline-block mt-4 underline" href="/produtos">
          Voltar aos produtos
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Detalhes do Produto</h2>
      <h3 className="mt-2 text-lg font-bold">{nome}</h3>

      {img ? (
        <img
          src={img}
          alt={nome}
          className="mt-3 h-64 w-full object-contain bg-white/60 rounded-2xl"
        />
      ) : null}

      <p className="mt-3 opacity-90">{desc}</p>
      <div className="mt-4 text-lg">{preco ? `${preco} €` : ""}</div>

      <button
        onClick={() => {
          addRemoved(Number(produto.id))
          setRemoved(true)
        }}
        className="mt-6 bg-red-500 text-white px-5 py-3 rounded-2xl"
      >
        Remover produto
      </button>

      <div className="mt-6">
        <Link className="underline" href="/produtos">
          Voltar aos produtos
        </Link>
      </div>
    </div>
  )
}
