import Projeto from "@/components/Projeto/Projeto"

export default function DescricaoProjetos() {
  return (
    <div>
      <p>
        Ao longo da disciplina desenvolvi vários projetos. Podes ver todos na minha
        página do GitHub Pages:{" "}
        <a
          href="https://github.com/rodrigo-nascimento-a22403960"
          target="_blank"
          rel="noreferrer"
        >
          https://SEU-UTILIZADOR.github.io/
        </a>
      </p>

      <h2>Alguns projetos</h2>

      <Projeto nome="Loja" url="https://rodrigo-nascimento-a22403960.github.io/rodrigonascimento.github.io/" />
      <Projeto nome="Site JS Interativo" url="https://refactored-succotash-97x7974rgg79hxv74-3001.app.github.dev/projetos" />
    </div>
  )
}
