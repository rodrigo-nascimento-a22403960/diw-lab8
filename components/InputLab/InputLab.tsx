"use client"

import { useMemo, useState } from "react"
import tecnologias from "@/app/data/tecnologias.json"

type Tecnologia = {
  title: string
  image: string
  description: string
  rating: number
}

type Tarefa = {
  id: number
  text: string
}

export default function InputLab() {
  // 1) Input de texto
  const [texto, setTexto] = useState("")

  // 2) Seletor (tecnologias)
  const techs = useMemo(() => tecnologias as Tecnologia[], [])
  const [techSelecionada, setTechSelecionada] = useState<string>(
    techs[0]?.title ?? ""
  )

  // 3) Lista de tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [novaTarefa, setNovaTarefa] = useState("")

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState("")

  function adicionarTarefa() {
    const t = novaTarefa.trim()
    if (!t) return

    const tarefa: Tarefa = { id: Date.now(), text: t }
    setTarefas((prev) => [tarefa, ...prev])
    setNovaTarefa("")
  }

  function apagarTarefa(id: number) {
    setTarefas((prev) => prev.filter((t) => t.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setEditingText("")
    }
  }

  function iniciarEdicao(t: Tarefa) {
    setEditingId(t.id)
    setEditingText(t.text)
  }

  function cancelarEdicao() {
    setEditingId(null)
    setEditingText("")
  }

  function guardarEdicao(id: number) {
    const novo = editingText.trim()
    if (!novo) return

    setTarefas((prev) => prev.map((t) => (t.id === id ? { ...t, text: novo } : t)))
    setEditingId(null)
    setEditingText("")
  }

  return (
    <div className="mt-4 flex flex-col gap-6">
      {/* Input de texto */}
      <section className="bg-blue-300/60 rounded-2xl p-4">
        <p className="font-bold">Input de texto</p>

        <input
          className="mt-2 w-full rounded-xl p-2 text-black"
          placeholder="Escreve aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <p className="mt-3">
          Texto digitado: <span className="font-bold">{texto || "(vazio)"}</span>
        </p>
      </section>

      {/* Seletor */}
      <section className="bg-blue-300/60 rounded-2xl p-4">
        <p className="font-bold">Seletor de tecnologia</p>

        <select
          className="mt-2 w-full rounded-xl p-2 text-black"
          value={techSelecionada}
          onChange={(e) => setTechSelecionada(e.target.value)}
        >
          {techs.map((t, i) => (
            <option key={i} value={t.title}>
              {t.title}
            </option>
          ))}
        </select>

        <p className="mt-3">
          Selecionada: <span className="font-bold">{techSelecionada}</span>
        </p>
      </section>

      {/* Lista de tarefas */}
      <section className="bg-blue-300/60 rounded-2xl p-4">
        <p className="font-bold">Lista de tarefas</p>

        <div className="mt-2 flex gap-2">
          <input
            className="flex-1 rounded-xl p-2 text-black"
            placeholder="Nova tarefa..."
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") adicionarTarefa()
            }}
          />

          <button
            className="rounded-xl px-4 py-2 bg-black text-white"
            onClick={adicionarTarefa}
          >
            Inserir
          </button>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {tarefas.length === 0 && <li>(ainda sem tarefas)</li>}

          {tarefas.map((t) => (
            <li key={t.id} className="rounded-xl bg-white/30 p-3">
              {editingId === t.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    className="rounded-xl p-2 text-black"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />

                  <div className="flex gap-2">
                    <button
                      className="rounded-xl px-3 py-1 bg-black text-white"
                      onClick={() => guardarEdicao(t.id)}
                    >
                      Guardar
                    </button>

                    <button
                      className="rounded-xl px-3 py-1 bg-white/40"
                      onClick={cancelarEdicao}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <span>{t.text}</span>

                  <div className="flex gap-2">
                    <button
                      className="rounded-xl px-3 py-1 bg-black text-white"
                      onClick={() => iniciarEdicao(t)}
                    >
                      Editar
                    </button>

                    <button
                      className="rounded-xl px-3 py-1 bg-white/40"
                      onClick={() => apagarTarefa(t.id)}
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
