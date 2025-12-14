import "./globals.css"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = new Date()

  return (
    <html lang="en">
      <body className="flex flex-col justify-start gap-4 p-20 items-center min-h-screen">
        <header className="flex flex-col items-center">
          <h1>React & Next.js</h1>

          <nav className="flex gap-4">
            <Link href="/">Intro</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/caracteristicas">Características</Link>
            <Link href="/tecnologias">Tecnologias</Link>
            <Link href="/projetos">Projetos</Link>

          </nav>
        </header>

        <main className="bg-blue-200 p-5 rounded-2xl max-w-2xl min-h-[70vh]">
          {children}
        </main>

        <footer>DIW {data.getFullYear()}</footer>
      </body>
    </html>
  )
}
