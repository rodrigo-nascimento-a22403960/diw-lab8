"use client"

import { useEffect, useMemo, useState } from "react"

export interface ContadorPersonalizadoProps {
  title?: string
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {
  const storageKey = useMemo(() => {
    const safe =
      typeof title === "string" && title.trim().length > 0
        ? title.trim().toLowerCase().replace(/\s+/g, "-")
        : "unknown"
    return `likes:${safe}`
  }, [title])

  const [likes, setLikes] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const raw = localStorage.getItem(storageKey)
    const n = raw ? Number(raw) : 0
    setLikes(Number.isFinite(n) ? n : 0)
  }, [storageKey])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(storageKey, String(likes))
  }, [likes, mounted, storageKey])

  return (
    <button
      type="button"
      onClick={() => setLikes((v) => v + 1)}
      className="bg-white/70 px-3 py-1 rounded-xl font-semibold hover:bg-white transition"
      suppressHydrationWarning
    >
      ❤️ {mounted ? likes : 0}
    </button>
  )
}
