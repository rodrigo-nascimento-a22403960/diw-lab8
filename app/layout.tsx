import "./globals.css"
import Link from "next/link"
import Relogio from "@/components/Relogio/Relogio"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const data = new Date()

  return (
    <html lang="en">
      <body className="flex flex-col justify-start gap-4 p-20 items-center min-h-screen">
        <header className="flex flex-col items-center">
          <h1>React & Next.js</h1>

          <nav className="flex gap-4 flex-wrap justify-center">
            <Link href="/">Intro</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/caracteristicas">Características</Link>
            <Link href="/tecnologias">Tecnologias</Link>
            <Link href="/projetos">Projetos</Link>
            <Link href="/contador">Contador</Link>
            <Link href="/input">Input</Link>
            <Link href="/produtos">Produtos</Link>
            <Link href="/categorias">Categorias</Link>
          </nav>
        </header>

        <main className="bg-blue-200 p-5 rounded-2xl max-w-2xl min-h-[70vh] w-full">
          {children}
        </main>

        <footer className="flex items-center gap-3">
          <span>DIW {data.getFullYear()}</span>
          <span className="opacity-70">|</span>
          <Relogio />
        </footer>
      </body>
    </html>
  )
}
