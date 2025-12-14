import Projeto from "@/components/Projeto/Projeto"

export default function DescricaoProjetos() {
  return (
    <div>
      <p>
        Ao longo da disciplina desenvolvi vários projetos. Podes ver todos na minha
        página do GitHub Pages:{" "}
        <a
          href="https://SEU-UTILIZADOR.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          https://SEU-UTILIZADOR.github.io/
        </a>
      </p>

      <h2>Alguns projetos</h2>

      <Projeto nome="Loja" url="https://exemplo.com/loja" />
      <Projeto nome="Site JS Interativo" url="https://exemplo.com/js-interativo" />
    </div>
  )
}
