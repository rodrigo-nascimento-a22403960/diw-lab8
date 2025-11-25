// components/TecnologiaDetailsCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Tecnologia } from "./TecnologiaCard";

type Props = {
  tecnologia: Tecnologia;
  index: number;
};

export default function TecnologiaDetailsCard({ tecnologia, index }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl px-10 py-10 max-w-xl w-full text-center">
      <Image
        src={`/tecnologias/${tecnologia.image}`}
        alt={tecnologia.title}
        width={120}
        height={120}
        className="mx-auto mb-6"
      />

      <h2 className="text-2xl font-bold mb-3">{tecnologia.title}</h2>

      <p className="text-sm mb-4">{tecnologia.description}</p>

      <p className="text-yellow-500 font-bold mb-6">
        Rating: {"★".repeat(tecnologia.rating)}
        {"☆".repeat(5 - tecnologia.rating)}
      </p>

      {/* botão voltar */}
      <Link
        href="/tecnologias"
        className="inline-block mt-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
      >
        Voltar às tecnologias
      </Link>
    </div>
  );
}
