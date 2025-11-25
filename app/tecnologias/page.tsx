import Image from 'next/image';
import tecnologiasJson from '@/app/data/tecnologias.json';

type Tecnologia = {
  title: string;
  image: string;
  description: string;
  rating: number;
};

// convertemos o JSON para um array JS (como o enunciado pede)
const tecnologias: Tecnologia[] = JSON.parse(JSON.stringify(tecnologiasJson));

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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tecnologias.map((tec, i) => (
            <article
              key={i}
              className="bg-white rounded-3xl shadow-lg px-8 pt-10 pb-8 flex flex-col items-center text-center"
            >
              {/* Imagem da tecnologia */}
              <div className="w-24 h-24 mb-6 relative">
                <Image
                  src={`/tecnologias/${tec.image}`}
                  alt={tec.title}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              <h3 className="text-xl font-semibold mb-3">{tec.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{tec.description}</p>

              <p className="text-sm font-medium text-amber-500">
                Rating: {'★'.repeat(tec.rating)}
                {'☆'.repeat(5 - tec.rating)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
