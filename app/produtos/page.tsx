// app/produtos/page.tsx
import { getProdutos } from "@/lib/deisishop"
import ProdutosList from "@/components/ProdutosList/ProdutosList"

export default async function ProdutosPage() {
  const produtos = await getProdutos()

  return (
    <div>
      <h2 className="text-xl font-bold">Produtos</h2>
      <ProdutosList produtos={produtos} />
    </div>
  )
}
