"use client"

import { useEffect, useState } from "react"
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard"
import { type Produto } from "@/lib/deisishop"

export default function RecentesPage() {
  const [recentes, setRecentes] = useState<Produto[]>([])

  // Ler do localStorage quando a página abre
  useEffect(() => {
    try {
      const raw = localStorage.getItem("recentes")
      if (raw) {
        setRecentes(JSON.parse(raw))
      }
    } catch {
      console.log("Erro ao ler recentes")
    }
  }, [])

  // Função para limpar histórico (Opcional, mas útil)
  function clearHistory() {
    localStorage.removeItem("recentes")
    setRecentes([])
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold drop-shadow-sm text-white">
          Vistos Recentemente (Últimos 5)
        </h2>
        
        {recentes.length > 0 && (
          <button 
            onClick={clearHistory}
            className="text-sm text-red-400 hover:text-red-300 underline"
          >
            Limpar Histórico
          </button>
        )}
      </div>

      {recentes.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Ainda não visitaste nenhum produto.</p>
          <p className="text-sm mt-2">Vai à página de produtos e clica em "+info"!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentes.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              // Como estamos numa página de histórico, 
              // desativei os botões de carrinho/favorito para simplificar,
              // mas podias adicionar a mesma lógica da página principal se quisesses.
            />
          ))}
        </div>
      )}
    </div>
  )
}