import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarFerramenta, ferramentas } from "@/lib/tools";
import ConsultaCnpj from "@/components/tools/ConsultaCnpj";

// Um componente por ferramenta -- adicionar uma nova é registrar aqui +
// em lib/tools.ts.
const componentesPorSlug: Record<string, React.ComponentType> = {
  "consulta-cnpj": ConsultaCnpj,
};

export function generateStaticParams() {
  return ferramentas.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ferramenta = buscarFerramenta(slug);
  if (!ferramenta) return {};

  return {
    title: ferramenta.nome,
    description: ferramenta.descricaoLonga,
    openGraph: {
      title: ferramenta.nome,
      description: ferramenta.descricaoLonga,
    },
  };
}

export default async function PaginaFerramenta({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ferramenta = buscarFerramenta(slug);
  const Componente = componentesPorSlug[slug];

  if (!ferramenta || !Componente) notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-6 py-16">
      <div className="w-full">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {ferramenta.categoria}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{ferramenta.nome}</h1>
        <p className="mt-3 text-black/60 dark:text-white/60">{ferramenta.descricaoLonga}</p>
      </div>

      <div className="mt-8 w-full">
        <Componente />
      </div>
    </main>
  );
}
