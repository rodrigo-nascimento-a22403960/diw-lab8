"use client"

import useSWR from "swr"
import { useEffect, useMemo, useState } from "react"
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard"
import { apiUrl, buy, swrFetcher, type Produto } from "@/lib/deisishop"

// Tipos de ordenação (incluindo Rating Asc/Desc)
type SortKey = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "rating-desc" | "rating-asc"

const LS_CART = "cart"
const LS_FAVORITES = "favorites" // Chave para guardar favoritos no browser

// Helpers
function priceToNumber(price: string | number) {
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

// Ler favoritos do localStorage
function readFavorites(): number[] {
  try {
    const raw = localStorage.getItem(LS_FAVORITES)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

// Escrever favoritos no localStorage
function writeFavorites(ids: number[]) {
  localStorage.setItem(LS_FAVORITES, JSON.stringify(ids))
}

export default function ProdutosPage() {
  const { data, error, isLoading, mutate } = useSWR<Produto[]>(
    apiUrl("/products"),
    swrFetcher as any
  )

  // Estados de Filtro e Ordenação
  const [sort, setSort] = useState<SortKey>("name-asc")
  const [search, setSearch] = useState("")

  // Estados Carrinho e Favoritos
  const [cart, setCart] = useState<Produto[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Estados de Compra
  const [student, setStudent] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [name, setName] = useState("")
  const [buyStatus, setBuyStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [buyMsg, setBuyMsg] = useState<string>("")

  // 1. Carregar dados do localStorage ao iniciar
  useEffect(() => {
    setCart(readCart())
    setFavorites(readFavorites())
    setHydrated(true)
  }, [])

  // 2. Guardar dados no localStorage sempre que mudam
  useEffect(() => {
    if (hydrated) {
      writeCart(cart)
      writeFavorites(favorites)
    }
  }, [cart, favorites, hydrated])

  function addToCart(p: Produto) {
    setCart((prev) => (prev.some((x) => x.id === p.id) ? prev : [...prev, p]))
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((x) => x.id !== id))
  }

  // Função para adicionar/remover dos favoritos
  function toggleFavorite(id: number) {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    )
  }

  // Lógica de Filtragem e Ordenação
  const filteredAndSortedProdutos = useMemo(() => {
    if (!data) return []

    // Filtrar por pesquisa
    let produtos = data.filter((p) => 
      (p.title ?? "").toLowerCase().includes(search.toLowerCase())
    )

    // Ordenar
    produtos.sort((a, b) => {
      const nameA = (a.title ?? "").toLowerCase()
      const nameB = (b.title ?? "").toLowerCase()
      const priceA = priceToNumber(a.price)
      const priceB = priceToNumber(b.price)
      
      // Tratamento seguro para Rating (caso a API não envie rating em alguns produtos)
      const ratingA = (a as any).rating?.rate ?? 0
      const ratingB = (b as any).rating?.rate ?? 0

      switch (sort) {
        case "name-asc": return nameA.localeCompare(nameB)
        case "name-desc": return nameB.localeCompare(nameA)
        case "price-asc": return priceA - priceB
        case "price-desc": return priceB - priceA
        case "rating-desc": return ratingB - ratingA // Melhor para Pior
        case "rating-asc": return ratingA - ratingB // Pior para Melhor
        default: return 0
      }
    })
    return produtos
  }, [data, sort, search])

  const total = useMemo(() => cart.reduce((sum, p) => sum + priceToNumber(p.price), 0), [cart])

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
        <button onClick={() => mutate()} className="mt-3 rounded-xl bg-blue-300 px-4 py-2 hover:bg-blue-200">
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-extrabold drop-shadow-sm">Produtos</h2>

        {/* Barra de Controlo: Pesquisa e Ordenação */}
        <div className="flex flex-col sm:flex-row gap-4 bg-blue-300/20 p-4 rounded-xl">
          <input 
            type="text" 
            placeholder="Pesquisar produto..." 
            className="flex-grow p-2 rounded-xl outline-none text-slate-900 placeholder:text-slate-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <label className="flex items-center gap-2">
            <span className="opacity-80 text-sm font-bold">Ordenar:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-xl bg-white px-3 py-2 outline-none text-slate-900 cursor-pointer"
            >
              <option value="name-asc">Nome (A → Z)</option>
              <option value="name-desc">Nome (Z → A)</option>
              <option value="price-asc">Preço (↑)</option>
              <option value="price-desc">Preço (↓)</option>
              <option value="rating-desc">⭐ Rating (Melhor)</option>
              <option value="rating-asc">⭐ Rating (Pior)</option>
            </select>
          </label>
        </div>
      </div>

      {/* Lista de Produtos (Mapeada diretamente aqui) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProdutos.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            inCart={cart.some((p) => p.id === produto.id)}
            // Passamos se é favorito e a função de alterar
            isFavorite={favorites.includes(produto.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Carrinho */}
      <div className="rounded-2xl bg-blue-300/30 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold">Carrinho ({cart.length})</h3>
          <div className="opacity-90 font-semibold">Total: {total.toFixed(2)} €</div>
        </div>

        {cart.length === 0 ? (
          <p className="mt-2 opacity-80">Carrinho vazio.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cart.map((p) => (
              <ProdutoCard
                key={p.id}
                produto={p}
                inCart={true}
                onRemoveFromCart={removeFromCart}
                // Também passamos os favoritos aqui, para consistência
                isFavorite={favorites.includes(p.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Formulário de Compra */}
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
            className="rounded-xl bg-slate-900 px-4 py-2 text-white font-semibold hover:bg-slate-800 disabled:opacity-50 sm:col-span-2"
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