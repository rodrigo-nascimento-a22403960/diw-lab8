// components/DescricaoProjetos.tsx
import Projeto from '@/components/Projeto';

export default function DescricaoProjetos() {
  const urlGithubPages = "https://rodrigo-nascimento-a22403960.github.io/rodrigonascimento.github.io/";

  return (
    <div>
      <p>
        Ao longo da disciplina desenvolvi vários projetos em HTML, CSS,
        JavaScript e Next.js. Podes ver todos os meus projetos publicados no
        GitHub Pages:
      </p>

      <p>
        <a
          href={urlGithubPages}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 underline"
        >
          Visitar a minha homepage de projetos
        </a>
      </p>

      <h3>Alguns projetos em destaque</h3>
      <ul>
        <Projeto
          nome="Loja online com JS interativo"
          url="https://teu-utilizador.github.io/loja" // troca pelo link real da loja
        />
        {/* Se quiseres, adiciona mais projetos aqui */}
        {/* <Projeto nome="Outro projeto fixe" url="https://..." /> */}
      </ul>
    </div>
  );
}
