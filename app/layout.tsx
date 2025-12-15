// app/layout.tsx
import "./globals.css"
import Link from "next/link"
import Relogio from "@/components/Relogio/Relogio"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const data = new Date()

  return (
    <html lang="en">
      <body
        className={`
          ${inter.className}
          flex flex-col justify-start gap-4 p-20 items-center min-h-screen
          text-white/90 antialiased
          [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]
        `}
      >
        <header className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">React & Next.js</h1>

          <nav className="mt-3 flex gap-4 flex-wrap justify-center text-white/90">
            <Link className="hover:text-white" href="/">Intro</Link>
            <Link className="hover:text-white" href="/sobre">Sobre</Link>
            <Link className="hover:text-white" href="/caracteristicas">Características</Link>
            <Link className="hover:text-white" href="/tecnologias">Tecnologias</Link>
            <Link className="hover:text-white" href="/projetos">Projetos</Link>
            <Link className="hover:text-white" href="/contador">Contador</Link>
            <Link className="hover:text-white" href="/input">Input</Link>
            <Link className="hover:text-white" href="/produtos">Produtos</Link>
            <Link className="hover:text-white" href="/categorias">Categorias</Link>
          </nav>
        </header>

        <main className="bg-blue-200 p-5 rounded-2xl max-w-2xl min-h-[70vh] w-full text-white/90">
          {children}
        </main>

        <footer className="flex items-center gap-3 text-white/80">
          <span>DIW {data.getFullYear()}</span>
          <span className="opacity-70">|</span>
          <Relogio />
        </footer>
      </body>
    </html>
  )
}
