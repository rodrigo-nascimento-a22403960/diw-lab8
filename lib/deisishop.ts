// lib/deisishop.ts

export const API_BASE = "https://deisishop.pythonanywhere.com"

export type Categoria = {
  name: string
}

export type Rating = {
  rate: number
  count: number
}

export type Produto = {
  id: number
  title: string
  price: string // vem como string na API
  description: string
  category: string
  image: string
  rating: Rating
}

export type BuyRequest = {
  products: number[]
  student: boolean
  coupon: string
  name: string
}

export type BuyResponse = {
  totalCost: string
  reference: string
  message: string
  error?: string
}

export function apiUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${API_BASE}${p}`
}

export function resolveImageUrl(img?: string | null) {
  if (!img) return ""
  if (img.startsWith("http://") || img.startsWith("https://")) return img
  if (img.startsWith("//")) return `https:${img}`
  if (img.startsWith("/")) return apiUrl(img)
  return img
}

// fetcher para SWR (tipagem simples para não dar erro no Next16/SWR)
export async function swrFetcher(url: string) {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => "")
    throw new Error(`API ${res.status} ${res.statusText} (${url}) ${txt}`)
  }

  return res.json()
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(apiUrl(path), {
    cache: "no-store",
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => "")
    throw new Error(`API ${res.status} ${res.statusText} (${path}) ${txt}`)
  }

  return (await res.json()) as T
}

export async function getProdutos() {
  return fetchJson<Produto[]>("/products")
}

export async function getProduto(id: number) {
  const res = await fetch(apiUrl(`/products/${id}`), { cache: "no-store" })
  if (res.status === 404) return null
  if (!res.ok) {
    const txt = await res.text().catch(() => "")
    throw new Error(`API ${res.status} ${res.statusText} (/products/${id}) ${txt}`)
  }
  return (await res.json()) as Produto
}

export async function getCategorias() {
  return fetchJson<Categoria[]>("/categories")
}

// API não tem endpoint "por categoria": filtramos localmente
export async function getProdutosDaCategoria(nomeCategoria: string) {
  const produtos = await getProdutos()
  const alvo = (nomeCategoria ?? "").trim().toLowerCase()
  return produtos.filter((p) => (p.category ?? "").trim().toLowerCase() === alvo)
}

export async function buy(payload: BuyRequest) {
  return fetchJson<BuyResponse>("/buy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}
