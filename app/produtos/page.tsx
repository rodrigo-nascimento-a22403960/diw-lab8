"use client"

import useSWR from "swr"
import { useEffect, useMemo, useState } from "react"
import ProdutosList from "@/components/ProdutosList/ProdutosList"
import { apiUrl, buy, swrFetcher, type Produto } from "@/lib/deisishop"
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard"

type SortKey = "name-asc" | "name-desc" | "price-asc" | "price-desc"
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

export default function ProdutosPage() {
  const { data, error, isLoading, mutate } = useSWR<Produto[]>(
    apiUrl("/products"),
    swrFetcher
  )

  const [sort, setSort] = useState<SortKey>("name-asc")

  // carrinho
  const [cart, setCart] = useState<Produto[]>([])
  const [hydrated, setHydrated] = useState(false)

  // comprar
  const [student, setStudent] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [name, setName] = useState("")
  const [buyStatus, setBuyStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [buyMsg, setBuyMsg] = useState<string>("")

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

  const sortedProdutos = useMemo(() => {
    const produtos = [...(data ?? [])]
    produtos.sort((a, b) => {
      const nameA = (a.title ?? "").toLowerCase()
      const nameB = (b.title ?? "").toLowerCase()
      const priceA = priceToNumber(a.price)
      const priceB = priceToNumber(b.price)

      switch (sort) {
        case "name-asc":
          return nameA.localeCompare(nameB)
        case "name-desc":
          return nameB.localeCompare(nameA)
        case "price-asc":
          return priceA - priceB
        case "price-desc":
          return priceB - priceA
      }
    })
    return produtos
  }, [data, sort])

  const total = useMemo(
    () => cart.reduce((sum, p) => sum + priceToNumber(p.price), 0),
    [cart]
  )

  async function onBuy() {
    if (cart.length === 0) return
    setBuyStatus("loading")
    setBuyMsg("")

    try {
      const res = await buy({
        products: cart.map((p) => p.id),
        student,
        coupon,
        name,
      })

      setCart([])
      setBuyStatus("success")
      setBuyMsg(`${res.message} | Ref: ${res.reference} | Total: ${res.totalCost} €`)
    } catch (e: any) {
      setBuyStatus("error")
      setBuyMsg(String(e?.message ?? e))
    }
  }

  if (isLoading) return <p className="mt-2 opacity-80">A carregar...</p>

  if (error) {
    return (
      <div className="mt-4 rounded-2xl bg-red-500/10 p-4">
        <p className="font-bold">Erro a carregar produtos</p>
        <p className="opacity-80 mt-1">{String((error as any)?.message ?? error)}</p>
        <button
          onClick={() => mutate()}
          className="mt-3 rounded-xl bg-blue-300 px-4 py-2 hover:bg-blue-200"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-extrabold text-white drop-shadow">Produtos</h2>


        <label className="flex items-center gap-2">
          <span className="opacity-80 text-sm">Ordenar:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl bg-blue-300/60 px-3 py-2 outline-none"
          >
            <option value="name-asc">Nome (A → Z)</option>
            <option value="name-desc">Nome (Z → A)</option>
            <option value="price-asc">Preço (↑)</option>
            <option value="price-desc">Preço (↓)</option>
          </select>
        </label>
      </div>

      <ProdutosList
        produtos={sortedProdutos}
        cartIds={cartIds}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
      />

      {/* Carrinho */}
      <div className="rounded-2xl bg-blue-300/30 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Carrinho ({cart.length})</h3>
          <div className="opacity-90">Total: {total.toFixed(2)} €</div>
        </div>

        {cart.length === 0 ? (
          <p className="mt-2 opacity-80">Carrinho vazio.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cart.map((p) => (
              <div key={p.id}>
                {/* reutiliza o mesmo card mas forçando modo "inCart" */}
                <ProdutosList
                  produtos={[p]}
                  cartIds={new Set([p.id])}
                  onRemoveFromCart={removeFromCart}
                />
              </div>
            ))}
          </div>
        )}

        {/* Comprar */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={student}
              onChange={(e) => setStudent(e.target.checked)}
            />
            <span>Estudante DEISI</span>
          </label>

          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Cupão (ex: DEISI10)"
            className="rounded-xl bg-blue-300/20 px-3 py-2 outline-none"
          />

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            className="rounded-xl bg-blue-300/20 px-3 py-2 outline-none sm:col-span-2"
          />

          <button
            onClick={onBuy}
            disabled={cart.length === 0 || buyStatus === "loading"}
            className="rounded-xl bg-blue-300 px-4 py-2 hover:bg-blue-200 disabled:opacity-50 sm:col-span-2"
          >
            {buyStatus === "loading" ? "A comprar..." : "Comprar"}
          </button>

          {buyMsg ? (
            <p className={buyStatus === "error" ? "text-red-600 sm:col-span-2" : "sm:col-span-2"}>
              {buyMsg}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
