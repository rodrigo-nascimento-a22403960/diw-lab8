"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import useSWR from "swr"

import ProdutosList from "@/components/ProdutosList/ProdutosList"
import { apiUrl, swrFetcher, type Produto } from "@/lib/deisishop"

const LS_CART = "cart"

function priceToNumber(price: string) {
  const n = Number(String(price ?? "").replace(",", "."))
  return Number.isFinite(n) ? n : 0
}

function readCart(): Produto[] {
  try {
    const raw = localStorage.getItem(LS_CART)
    const arr = raw ? (JSON.parse(raw) as unknown) : []
    const list = Array.isArray(arr) ? arr : []
    return list
      .map((x: any) => x as Produto)
      .filter((p) => p && Number.isFinite(Number(p.id)))
  } catch {
    return []
  }
}

function writeCart(cart: Produto[]) {
  localStorage.setItem(LS_CART, JSON.stringify(cart))
}

export default function CategoriaProdutosPage() {
  const params = useParams()
  const raw = params?.name
  const nameStr = Array.isArray(raw) ? raw[0] : raw
  const categoria = decodeURIComponent(nameStr ?? "").trim()

  const { data, error, isLoading, mutate } = useSWR<Produto[]>(
    apiUrl("/products"),
    swrFetcher as any
  )

  // carrinho (partilhado via localStorage)
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
    setCart((prev) => prev.filter((x) => x.id !== id))
  }

  const cartIds = useMemo(() => new Set(cart.map((p) => p.id)), [cart])

  const alvo = categoria.toLowerCase()
  const produtos = (data ?? []).filter(
    (p) => (p.category ?? "").trim().toLowerCase() === alvo
  )

  const total = useMemo(() => cart.reduce((sum, p) => sum + priceToNumber(p.price), 0), [cart])

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-extrabold drop-shadow-sm">
          Categoria: {categoria || "—"}
        </h2>

        <div className="text-sm font-semibold opacity-90">
          Carrinho: {cart.length} | {total.toFixed(2)} €
        </div>
      </div>

      {isLoading ? (
        <p className="mt-2 opacity-80">A carregar...</p>
      ) : error ? (
        <div className="mt-4 rounded-2xl bg-red-500/10 p-4">
          <p className="font-bold">Erro</p>
          <p className="opacity-80 mt-1">{String((error as any)?.message ?? error)}</p>
          <button
            onClick={() => mutate()}
            className="mt-3 rounded-xl bg-blue-300 px-4 py-2 hover:bg-blue-200"
          >
            Tentar novamente
          </button>
        </div>
      ) : produtos.length === 0 ? (
        <p className="mt-2 opacity-80">Sem produtos para mostrar.</p>
      ) : (
        <ProdutosList
          produtos={produtos}
          cartIds={cartIds}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
        />
      )}

      <div className="mt-6 flex flex-wrap gap-4">
        <Link href="/categorias" className="underline">
          Voltar às categorias
        </Link>

        <Link href="/produtos" className="underline">
          Ir para Produtos (checkout)
        </Link>
      </div>
    </div>
  )
}
