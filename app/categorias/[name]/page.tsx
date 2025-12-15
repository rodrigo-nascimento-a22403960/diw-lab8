"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { useEffect, useMemo, useState } from "react"

import ProdutoCard from "@/components/ProdutoCard/ProdutoCard"
import { apiUrl, swrFetcher, type Produto } from "@/lib/deisishop"

const LS_CART = "cart" // IMPORTANTE: usa a MESMA key que usas em /produtos

function readCart(): Produto[] {
  try {
    const raw = localStorage.getItem(LS_CART)
    const arr = raw ? (JSON.parse(raw) as unknown) : []
    return Array.isArray(arr) ? (arr as Produto[]) : []
  } catch {
    return []
  }
}

function writeCart(cart: Produto[]) {
  try {
    localStorage.setItem(LS_CART, JSON.stringify(cart))
  } catch {}
}

export default function CategoriaProdutosPage() {
  const params = useParams()
  const raw = params?.name
  const nameStr = Array.isArray(raw) ? raw[0] : raw
  const categoria = decodeURIComponent(nameStr ?? "").trim()

  // produtos
  const { data, error, isLoading, mutate } = useSWR<Produto[]>(
    apiUrl("/products"),
    swrFetcher
  )

  const produtos = useMemo(() => {
    const alvo = categoria.toLowerCase()
    return (data ?? []).filter(
      (p) => (p.category ?? "").trim().toLowerCase() === alvo
    )
  }, [data, categoria])

  // carrinho
  const [cart, setCart] = useState<Produto[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setCart(readCart())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) writeCart(cart)
  }, [cart, hydrated])

  function addToCart(p: Produto) {
    setCart((prev) => (prev.some((x) => x.id === p.id) ? prev : [...prev, p]))
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Categoria: {categoria || "—"}</h2>

      {isLoading ? (
        <p className="mt-2 opacity-80">A carregar...</p>
      ) : error ? (
        <>
          <p className="mt-2 text-red-600">Erro: {String((error as any)?.message ?? error)}</p>
          <button
            onClick={() => mutate()}
            className="mt-3 rounded-xl bg-blue-300 px-4 py-2"
          >
            Tentar novamente
          </button>
        </>
      ) : produtos.length === 0 ? (
        <p className="mt-2 opacity-80">Sem produtos para mostrar.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {produtos.map((p) => {
            const inCart = cart.some((x) => x.id === p.id)
            return (
              <ProdutoCard
                key={p.id}
                produto={p}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                inCart={inCart}
              />
            )
          })}
        </div>
      )}

      <Link href="/categorias" className="inline-block mt-4 underline">
        Voltar às categorias
      </Link>
    </div>
  )
}
