// lib/deisishop.ts

export type Rating = {
  rate: number
  count: number
}

export type Produto = {
  id: number
  title?: string
  name?: string
  price?: string
  preco?: string
  description?: string
  descricao?: string
  category?: string
  categoria?: string
  image?: string
  imagem?: string
  image_url?: string
  imagem_url?: string
  rating?: Rating
}

export type Categoria = {
  name: string
}

export type BuyRequest = {
  products: number[]
  student: boolean
  coupon?: string
  name: string
}

export type BuyResponse = {
  totalCost?: string
  reference?: string
  message?: string
  error?: string
}

// Ajusta se precisares (mas como já estás a ver produtos, isto deve estar ok)
const BASE_URL =
  process.env.NEXT_PUBLIC_DEISISHOP_API_URL ??
  process.env.DEISISHOP_API_URL ??
  "http://localhost:3001"

export function apiUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${BASE_URL}${p}`
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
    throw new Error(`API ${res.status} em ${path}${txt ? `: ${txt}` : ""}`)
  }

  return (await res.json()) as T
}

function norm(s: unknown) {
  return String(s ?? "").trim().toLowerCase()
}

export function resolveImageUrl(img: string | null | undefined) {
  if (!img) return ""
  const s = String(img).trim()
  if (!s) return ""

  // já é URL completa
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:")) return s

  // se vier tipo "/images/x.png" ou "images/x.png"
  return apiUrl(s.startsWith("/") ? s : `/${s}`)
}

export async function getCategorias(): Promise<Categoria[]> {
  const data = await fetchJson<any>("/categories")

  // Swagger mostra [{ name: "..." }], mas deixo compatível se vier ["..."]
  if (Array.isArray(data) && typeof data[0] === "string") {
    return data.map((name: string) => ({ name }))
  }

  if (Array.isArray(data)) return data as Categoria[]
  return []
}

export async function getProdutos(): Promise<Produto[]> {
  const data = await fetchJson<any>("/products")
  return Array.isArray(data) ? (data as Produto[]) : []
}

/**
 * A API (Swagger) NÃO tem GET /products/{id}.
 * Então buscamos a lista e filtramos.
 */
export async function getProduto(id: number): Promise<Produto | null> {
  const produtos = await getProdutos()
  const nid = Number(id)
  if (!Number.isFinite(nid)) return null

  return (
    produtos.find((p) => Number((p as any).id) === nid) ??
    null
  )
}

/**
 * A API (Swagger) NÃO tem endpoint de categoria.
 * Então buscamos a lista e filtramos por "category".
 */
export async function getProdutosDaCategoria(categoria: string): Promise<Produto[]> {
  const produtos = await getProdutos()
  const wanted = norm(categoria)

  return produtos.filter((p) => {
    const c = norm((p as any).category ?? (p as any).categoria)
    return c === wanted
  })
}

export async function buy(payload: BuyRequest): Promise<BuyResponse> {
  return await fetchJson<BuyResponse>("/buy", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })
}
