"use client";

import { useState } from "react";

type Socio = {
  nome_socio: string;
  qualificacao_socio: string;
};

type ResultadoCnpj = {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  descricao_situacao_cadastral: string;
  cnae_fiscal_descricao: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  ddd_telefone_1: string;
  email: string;
  porte: string;
  data_inicio_atividade: string;
  qsa: Socio[];
};

function formatarCnpj(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 14);
  return digitos
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2}\.\d{3})(\d)/, "$1.$2")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatarCep(cep: string) {
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

export default function ConsultaCnpj() {
  const [entrada, setEntrada] = useState("");
  const [status, setStatus] = useState<"idle" | "carregando" | "erro" | "ok">("idle");
  const [erro, setErro] = useState("");
  const [dados, setDados] = useState<ResultadoCnpj | null>(null);

  const consultar = async (e: React.FormEvent) => {
    e.preventDefault();
    const cnpjLimpo = entrada.replace(/\D/g, "");
    if (cnpjLimpo.length !== 14) {
      setStatus("erro");
      setErro("CNPJ precisa ter 14 dígitos.");
      return;
    }

    setStatus("carregando");
    setErro("");
    try {
      const res = await fetch(`/api/cnpj/${cnpjLimpo}`);
      const json = await res.json();
      if (!res.ok) {
        setStatus("erro");
        setErro(json.erro || "Não foi possível consultar esse CNPJ.");
        return;
      }
      setDados(json);
      setStatus("ok");
    } catch {
      setStatus("erro");
      setErro("Serviço indisponível no momento. Tenta de novo em instantes.");
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={consultar} className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          placeholder="00.000.000/0000-00"
          value={entrada}
          onChange={(e) => setEntrada(formatarCnpj(e.target.value))}
          className="flex-1 rounded-lg border border-black/10 dark:border-white/15 bg-white dark:bg-black/20 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === "carregando"}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "carregando" ? "Buscando…" : "Consultar"}
        </button>
      </form>

      {status === "erro" && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">{erro}</p>
      )}

      {status === "ok" && dados && (
        <div className="mt-6 rounded-xl border border-black/10 dark:border-white/15 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">{dados.razao_social}</h2>
              {dados.nome_fantasia && (
                <p className="text-sm text-black/60 dark:text-white/60">{dados.nome_fantasia}</p>
              )}
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                dados.descricao_situacao_cadastral === "ATIVA"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
              }`}
            >
              {dados.descricao_situacao_cadastral}
            </span>
          </div>

          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-black/50 dark:text-white/50">CNPJ</dt>
              <dd className="font-medium">{formatarCnpj(dados.cnpj)}</dd>
            </div>
            <div>
              <dt className="text-black/50 dark:text-white/50">Porte</dt>
              <dd className="font-medium">{dados.porte || "—"}</dd>
            </div>
            <div>
              <dt className="text-black/50 dark:text-white/50">Atividade principal</dt>
              <dd className="font-medium">{dados.cnae_fiscal_descricao || "—"}</dd>
            </div>
            <div>
              <dt className="text-black/50 dark:text-white/50">Início de atividade</dt>
              <dd className="font-medium">{dados.data_inicio_atividade || "—"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-black/50 dark:text-white/50">Endereço</dt>
              <dd className="font-medium">
                {[dados.logradouro, dados.numero, dados.bairro].filter(Boolean).join(", ")}
                {dados.municipio && ` — ${dados.municipio}/${dados.uf}`}
                {dados.cep && ` — CEP ${formatarCep(dados.cep)}`}
              </dd>
            </div>
            {dados.ddd_telefone_1 && (
              <div>
                <dt className="text-black/50 dark:text-white/50">Telefone</dt>
                <dd className="font-medium">{dados.ddd_telefone_1}</dd>
              </div>
            )}
            {dados.email && (
              <div>
                <dt className="text-black/50 dark:text-white/50">E-mail</dt>
                <dd className="font-medium">{dados.email}</dd>
              </div>
            )}
          </dl>

          {dados.qsa?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-black/50 dark:text-white/50">Sócios</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {dados.qsa.map((s, i) => (
                  <li key={i}>
                    {s.nome_socio} <span className="text-black/40 dark:text-white/40">— {s.qualificacao_socio}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
