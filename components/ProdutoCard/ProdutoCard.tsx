"use client"

import Link from "next/link"
import { Produto, resolveImageUrl } from "@/lib/deisishop"

type Props = {
  produto: Produto
  onAddToCart?: (p: Produto) => void
  onRemoveFromCart?: (id: number) => void
  inCart?: boolean
  isFavorite?: boolean
  onToggleFavorite?: (id: number) => void
}

export default function ProdutoCard({
  produto,
  onAddToCart,
  onRemoveFromCart,
  inCart,
  isFavorite,
  onToggleFavorite
}: Props) {
  const nome = produto.title ?? `Produto #${produto.id}`
  const preco = produto.price ?? ""
  const img = resolveImageUrl(produto.image)
  const rating = (produto as any).rating?.rate 

  // --- NOVA FUNÇÃO: Adicionar aos Recentes ---
  function addToRecents() {
    const LS_KEY = "recentes"
    try {
      // 1. Ler o que já lá está
      const raw = localStorage.getItem(LS_KEY)
      let items: Produto[] = raw ? JSON.parse(raw) : []
      
      // 2. Remover se já existir (para não ter duplicados)
      items = items.filter((p) => p.id !== produto.id)
      
      // 3. Adicionar o novo no INÍCIO da lista
      items.unshift(produto)
      
      // 4. Manter apenas os 5 primeiros
      if (items.length > 5) {
        items = items.slice(0, 5)
      }
      
      // 5. Guardar de volta
      localStorage.setItem(LS_KEY, JSON.stringify(items))
    } catch (error) {
      console.error("Erro ao guardar recentes", error)
    }
  }

  return (
    <div className="rounded-2xl bg-blue-300/60 p-4 hover:bg-blue-300 transition text-slate-900 relative flex flex-col h-full">
      
      <button 
        onClick={() => onToggleFavorite?.(produto.id)}
        className="absolute top-3 right-3 z-10 bg-white/80 p-1.5 rounded-full hover:bg-white shadow-sm transition"
        title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {isFavorite ? (
           <span className="text-red-500 text-xl font-bold">♥</span> 
        ) : (
           <span className="text-gray-400 text-xl font-bold">♡</span> 
        )}
      </button>

      <div className="flex items-start justify-between gap-3 pr-8 mb-2">
        <div className="font-extrabold drop-shadow-sm line-clamp-2 leading-tight">{nome}</div>
        
        <Link
          href={`/produtos/${produto.id}`}
          // --- AQUI ESTÁ A MUDANÇA: Gravamos ao clicar ---
          onClick={addToRecents} 
          className="rounded-xl bg-white/60 px-3 py-1 text-sm font-semibold hover:bg-white/80 shrink-0"
        >
          +info
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center bg-white/40 rounded-xl my-2 p-2 min-h-[160px]">
        {img ? (
            <img src={img} alt={nome} className="h-32 w-full object-contain" loading="lazy" />
        ) : (
            <div className="text-sm opacity-60">sem imagem</div>
        )}
      </div>

      <div className="flex justify-between items-center font-bold opacity-90 mt-auto mb-3">
         <span>{preco ? `${preco} €` : ""}</span>
         {rating && (
            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-lg border border-yellow-200 shadow-sm">
               ⭐ {rating}
            </span>
         )}
      </div>

      <div className="flex gap-2 mt-auto">
        {!inCart ? (
          <button
            onClick={() => onAddToCart?.(produto)}
            className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white font-semibold hover:bg-slate-800 transition"
          >
            Adicionar
          </button>
        ) : (
          <button
            onClick={() => onRemoveFromCart?.(produto.id)}
            className="w-full rounded-xl bg-red-500/20 px-4 py-2 font-semibold hover:bg-red-500/30 transition text-red-700"
          >
            Remover
          </button>
        )}
      </div>
    </div>
  )
}