import Caracteristica from "@/components/Caracteristica/Caracteristica"
import { caracteristicas } from "@/app/data/caracteristicas"

export default function CaracteristicasPage() {
  return (
    <div>
      <h2>Características</h2>

      <div className="mt-4 grid gap-4">
        {caracteristicas.map((c, i) => (
          <Caracteristica key={i} caracteristica={c} index={i} />
        ))}
      </div>
    </div>
  )
}
