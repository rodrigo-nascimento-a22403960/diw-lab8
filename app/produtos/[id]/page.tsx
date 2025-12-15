"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import useSWR from "swr"

import ProdutoDetails from "@/components/ProdutoDetails/ProdutoDetails"
import { apiUrl, swrFetcher, type Produto } from "@/lib/deisishop"

export default function ProdutoPage() {
  const params = useParams()
  const raw = params?.id
  const idStr = Array.isArray(raw) ? raw[0] : raw
  const id = Number.parseInt(idStr ?? "", 10)

  const shouldFetch = Number.isFinite(id)

  const { data, error, isLoading, mutate } = useSWR<Produto>(
    shouldFetch ? apiUrl(`/products/${id}`) : null,
    swrFetcher
  )

  if (!shouldFetch) {
    return (
      <div>
        <h2 className="text-xl font-bold">Produto não encontrado</h2>
        <Link className="underline" href="/produtos">Voltar</Link>
      </div>
    )
  }

  if (isLoading) return <p className="mt-2 opacity-80">A carregar...</p>

  if (error) {
    const msg = String((error as any)?.message ?? error)
    const is404 = msg.includes(" 404 ")
    return (
      <div>
        <h2 className="text-xl font-bold">{is404 ? "Produto não encontrado" : "Erro ao carregar"}</h2>
        <p className="mt-2 text-red-600">{msg}</p>
        <div className="mt-3 flex gap-3">
          <button onClick={() => mutate()} className="rounded-xl bg-blue-300 px-4 py-2">
            Tentar novamente
          </button>
          <Link className="underline" href="/produtos">Voltar</Link>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        <h2 className="text-xl font-bold">Produto não encontrado</h2>
        <Link className="underline" href="/produtos">Voltar</Link>
      </div>
    )
  }

  return <ProdutoDetails produto={data} />
}
