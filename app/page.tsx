import Link from "next/link"
import MagiaDoJSX from "@/components/MagiaDoJSX/MagiaDoJSX"

export default function Intropage() {
  return (
    <div>
      <h2>Interfaces Modernos</h2>
      <p>Bem vindo à minha app em React e Next.js.</p>

      <Link href="/counter">Counter</Link>

      <MagiaDoJSX />
    </div>
  )
}
