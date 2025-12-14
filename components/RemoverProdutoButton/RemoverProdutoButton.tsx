"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RemoverProdutoButton({ id }: { id: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function remover() {
    setLoading(true)
    setErro(null)

    try {
      const res = await fetch(`/api/produtos/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error(`Falhou com status ${res.status}`)

      router.push("/produtos")
      router.refresh()
    } catch (e) {
      setErro("Não foi possível remover o produto.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={remover}
        disabled={loading}
        className="bg-red-300 px-4 py-2 rounded-xl hover:bg-red-400 disabled:opacity-60"
      >
        {loading ? "A remover..." : "Remover"}
      </button>

      {erro && <span className="text-sm text-red-700">{erro}</span>}
    </div>
  )
}
