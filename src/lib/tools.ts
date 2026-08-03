export type Ferramenta = {
  slug: string;
  nome: string;
  categoria: string;
  descricaoCurta: string;
  descricaoLonga: string;
};

// Registro central -- cada ferramenta nova = uma entrada aqui + um componente
// em components/tools/. A rota /[slug] carrega pelo slug.
export const ferramentas: Ferramenta[] = [
  {
    slug: "consulta-cnpj",
    nome: "Consulta CNPJ",
    categoria: "Empresas",
    descricaoCurta: "Dados completos de qualquer empresa a partir do CNPJ",
    descricaoLonga:
      "Consulte razão social, nome fantasia, endereço, situação cadastral, atividade econômica (CNAE) e sócios de qualquer empresa ativa no Brasil, gratuitamente, a partir do número do CNPJ.",
  },
];

export function buscarFerramenta(slug: string): Ferramenta | undefined {
  return ferramentas.find((f) => f.slug === slug);
}
