"use client"

import { useEffect, useState } from "react"

const MIN = 0
const MAX = 10

const STORAGE_VALUE = "diw_contador_value"
const STORAGE_HISTORY = "diw_contador_history"

function clamp(n: number) {
  return Math.max(MIN, Math.min(MAX, n))
}

function corDoNumero(n: number) {
  if (n >= 0 && n <= 3) return "text-red-500"
  if (n >= 4 && n <= 7) return "text-yellow-400"
  return "text-green-500"
}

export default function Contador() {
  const [valor, setValor] = useState<number>(0)
  const [historico, setHistorico] = useState<number[]>([0])
  const [carregado, setCarregado] = useState(false)

  // carregar do localStorage
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_VALUE)
      const h = localStorage.getItem(STORAGE_HISTORY)

      const valorInicial = v !== null ? clamp(Number(v)) : 0
      const historicoInicial = h ? (JSON.parse(h) as number[]) : [valorInicial]

      setValor(valorInicial)
      setHistorico(
        Array.isArray(historicoInicial) && historicoInicial.length > 0
          ? historicoInicial.map(clamp)
          : [valorInicial]
      )
    } catch {
      setValor(0)
      setHistorico([0])
    } finally {
      setCarregado(true)
    }
  }, [])

  // guardar no localStorage sempre que mudar (depois de carregar)
  useEffect(() => {
    if (!carregado) return
    localStorage.setItem(STORAGE_VALUE, String(valor))
    localStorage.setItem(STORAGE_HISTORY, JSON.stringify(historico))
  }, [valor, historico, carregado])

  function alterar(delta: number) {
    setValor((atual) => {
      const novo = clamp(atual + delta)
      if (novo === atual) return atual

      setHistorico((h) => [...h, novo])
      return novo
    })
  }

  function reset() {
    setValor(0)
    setHistorico([0])
  }

  return (
    <div className="mt-4 bg-blue-300/60 rounded-2xl p-6 max-w-xl">
      <div className="flex items-center justify-between gap-4">
        <p className="font-bold">Valor atual</p>
        <p className={`text-4xl font-extrabold ${corDoNumero(valor)}`}>{valor}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="bg-black/80 text-white px-4 py-2 rounded-xl disabled:opacity-40"
          onClick={() => alterar(-1)}
          disabled={valor === MIN}
        >
          -1
        </button>

        <button
          className="bg-black/80 text-white px-4 py-2 rounded-xl disabled:opacity-40"
          onClick={() => alterar(+1)}
          disabled={valor === MAX}
        >
          +1
        </button>

        <button
          className="bg-black/80 text-white px-4 py-2 rounded-xl disabled:opacity-40"
          onClick={() => alterar(-5)}
          disabled={valor === MIN}
        >
          -5
        </button>

        <button
          className="bg-black/80 text-white px-4 py-2 rounded-xl disabled:opacity-40"
          onClick={() => alterar(+5)}
          disabled={valor === MAX}
        >
          +5
        </button>

        <button className="bg-white/90 px-4 py-2 rounded-xl" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="mt-6">
        <p className="font-bold mb-2">Histórico de valores</p>
        <ul className="list-disc pl-6 space-y-1">
          {historico.map((v, i) => (
            <li key={`${v}-${i}`} className="text-white/90">
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
