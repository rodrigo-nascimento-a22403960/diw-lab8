// components/TecnologiaCard.tsx
import Image from "next/image";
import Link from "next/link";

export type Tecnologia = {
  title: string;
  image: string;
  description: string;
  rating: number;
};

type Props = {
  tecnologia: Tecnologia;
  index: number; // posição no array
};

export default function TecnologiaCard({ tecnologia, index }: Props) {
  return (
    <article className="bg-white rounded-3xl shadow-xl px-8 pt-10 pb-8 flex flex-col items-center text-center">
      <Image
        src={`/tecnologias/${tecnologia.image}`}
        alt={tecnologia.title}
        width={90}
        height={90}
        className="mb-6"
      />

      <h3 className="text-xl font-bold mb-2">{tecnologia.title}</h3>
      <p className="text-sm mb-4">{tecnologia.description}</p>

      <p className="text-yellow-500 font-bold mb-3">
        {"★".repeat(tecnologia.rating)}
        {"☆".repeat(5 - tecnologia.rating)}
      </p>

      {/* LINK para a rota dinâmica */}
      <Link
        href={`/tecnologia/${index}`}
        className="text-sm text-blue-600 hover:underline"
      >
        Ver mais detalhes
      </Link>
    </article>
  );
}
