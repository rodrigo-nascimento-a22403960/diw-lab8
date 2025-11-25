// components/Projeto.tsx
type ProjetoProps = {
  nome: string;
  url: string;
};

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <li>
      <p>
        Projeto{' '}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 underline"
        >
          {nome}
        </a>{' '}
        – clica no nome para abrir numa nova aba.
      </p>
    </li>
  );
}
