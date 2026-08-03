import { NextResponse } from "next/server";

// Proxy server-side pra BrasilAPI -- evita CORS no cliente e centraliza o
// formato de resposta num lugar só, caso a fonte troque no futuro.
//
// BrasilAPI é pública, gratuita e cobre o Brasil inteiro (nossa base própria,
// ver servidor kody, ainda só tem os campos usados na prospecção -- sem
// endereço/CNAE/sócios, que é o que uma consulta pública precisa mostrar).
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cnpj: string }> }
) {
  const { cnpj: cnpjBruto } = await params;
  const cnpj = cnpjBruto.replace(/\D/g, "");

  if (cnpj.length !== 14) {
    return NextResponse.json({ erro: "CNPJ precisa ter 14 dígitos" }, { status: 400 });
  }

  try {
    const resposta = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
      signal: AbortSignal.timeout(10_000),
      next: { revalidate: 60 * 60 * 24 }, // CNPJ muda pouco -- cache de 1 dia
    });

    if (resposta.status === 404) {
      return NextResponse.json({ erro: "CNPJ não encontrado" }, { status: 404 });
    }
    if (!resposta.ok) {
      return NextResponse.json({ erro: "Falha ao consultar" }, { status: 502 });
    }

    return NextResponse.json(await resposta.json());
  } catch {
    return NextResponse.json({ erro: "Serviço de consulta indisponível no momento" }, { status: 503 });
  }
}
