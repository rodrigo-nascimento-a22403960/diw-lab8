"use client"

import { useEffect, useState } from "react"

export default function Relogio() {
  const [hora, setHora] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const tick = () => {
      setHora(new Date().toLocaleTimeString("pt-PT", { hour12: false }))
    }

    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="font-mono" suppressHydrationWarning>
      {mounted ? hora : ""}
    </span>
  )
}
