// app/tecnologia/[id]/page.tsx
import tecnologiasJson from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/app/components/TecnologiaDetailsCard";
import type { Tecnologia } from "@/app/components/TecnologiaCard";

const tecnologias = tecnologiasJson as Tecnologia[];

type PageProps = {
  params: { id: string }; // vem da rota /tecnologia/0, /tecnologia/1, ...
};

export default function TecnologiaPage({ params }: PageProps) {
  const index = Number(params.id);

  if (Number.isNaN(index) || index < 0 || index >= tecnologias.length) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Tecnologia não encontrada.</p>
      </main>
    );
  }

  const tecnologia = tecnologias[index];

  return (
    <main className="min-h-screen bg-blue-200 flex items-center justify-center py-16 px-4">
      <TecnologiaDetailsCard tecnologia={tecnologia} index={index} />
    </main>
  );
}
