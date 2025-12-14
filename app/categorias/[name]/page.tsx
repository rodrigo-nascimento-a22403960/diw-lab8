import Link from "next/link"
import { getProdutosDaCategoria } from "@/lib/deisishop"
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard"

export default async function CategoriaProdutosPage({ params }: { params: { name: string } }) {
  const categoria = decodeURIComponent(params.name)

  const produtos = await getProdutosDaCategoria(categoria)

  return (
    <div>
      <h2 className="text-xl font-bold">Categoria: {categoria}</h2>

      {produtos.length === 0 ? (
        <p className="mt-4 opacity-80">Sem produtos para mostrar.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {produtos.map((p) => (
            <ProdutoCard key={p.id} produto={p} />
          ))}
        </div>
      )}

      <Link href="/categorias" className="inline-block mt-4 underline">
        Voltar às categorias
      </Link>
    </div>
  )
}
