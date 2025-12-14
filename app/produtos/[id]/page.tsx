import Link from "next/link"
import { getProduto } from "@/lib/deisishop"
import ProdutoDetails from "@/components/ProdutoDetails/ProdutoDetails"

export default async function ProdutoPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id, 10)

  if (Number.isNaN(id)) {
    return (
      <div>
        <h2>Produto não encontrado</h2>
        <Link href="/produtos" className="underline">Voltar</Link>
      </div>
    )
  }

  const produto = await getProduto(id)

  if (!produto) {
    return (
      <div>
        <h2>Produto não encontrado</h2>
        <Link href="/produtos" className="underline">Voltar</Link>
      </div>
    )
  }

  return <ProdutoDetails produto={produto} />
}
