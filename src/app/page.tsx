import Link from "next/link";
import { ferramentas } from "@/lib/tools";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">toollist</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">
        Ferramentas online, grátis, sem cadastro.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ferramentas.map((f) => (
          <Link
            key={f.slug}
            href={`/${f.slug}`}
            className="rounded-xl border border-black/10 p-5 transition-colors hover:border-blue-500 dark:border-white/15"
          >
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{f.categoria}</p>
            <h2 className="mt-1 font-semibold">{f.nome}</h2>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">{f.descricaoCurta}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
