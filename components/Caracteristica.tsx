// components/Caracteristica.tsx
import Link from "next/link";

export type TCaracteristica = {
  texto: string;
};

type Props = {
  car: TCaracteristica;
  index: number;
};

export default function Caracteristica({ car, index }: Props) {
  return (
    <li className="mb-4 text-lg">
      {/* Link para a rota dinâmica */}
      <Link
        href={`/caracteristica/${index}`}
        className="text-blue-600 hover:underline"
      >
        {car.texto}
      </Link>
    </li>
  );
}
