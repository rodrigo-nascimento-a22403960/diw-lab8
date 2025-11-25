// app/tecnologias/page.tsx
import tecnologiasJson from "@/app/data/tecnologias.json";
import TecnologiaCard, { Tecnologia } from "@/app/components/TecnologiaCard";

const tecnologias = tecnologiasJson as Tecnologia[];

export default function TecnologiasPage() {
  return (
    <main className="min-h-screen bg-blue-200 py-16 px-4">
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow mb-4">
          Tecnologias Exploradas
        </h2>
        <p className="text-blue-50 mb-10 max-w-3xl mx-auto">
          Nesta página estão algumas das tecnologias que trabalhei na disciplina
          de Interfaces Web.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {tecnologias.map((tec, i) => (
            <TecnologiaCard key={i} tecnologia={tec} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
