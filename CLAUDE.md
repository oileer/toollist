# toollist — Instruções para o agente de desenvolvimento

Leia este arquivo antes de começar qualquer sessão de dev neste repo.

## Objetivo
Construir um hub de ferramentas online (clone funcional do invertexto.com) com
**SEO forte** e **monetização via Google AdSense**, hospedado na Vercel em domínio próprio.

## Stack
- **Next.js (App Router)** + **TypeScript** + **Tailwind CSS**
- SSG/SSR por rota (cada ferramenta = uma página estática pra SEO)
- Deploy: Vercel

## ESTRATÉGIA-CHAVE: reaproveitar código da referência (economia de tokens)
O foco é **COPIAR/ADAPTAR as funções e a lógica JS do site de referência**, não reescrever do zero.
- Captura completa do invertexto está no repo **[oileer/referencias](https://github.com/oileer/referencias)**, pasta `invertexto/`:
  - `invertexto/html/<ferramenta>.html` — markup + scripts inline de cada ferramenta
  - `invertexto/js/` — scripts externos (lógica das ferramentas)
  - `invertexto/css/` — estilos
  - `invertexto/prints/` — screenshot de cada página (referência visual)
  - `invertexto/resumo.md` — stack, paleta, fontes
- Fluxo por ferramenta: abrir o HTML/JS correspondente na referência → extrair a função/lógica →
  portar para um componente React/TSX + rota Next. Reescrever só o wrapper de UI; **reusar o algoritmo**.
- ⚠️ Tokens Mapbox nos HTML de `distancia_entre_cidades` e `minha_localizacao_atual` foram censurados na referência.

## Fase 1 (primeira ação): ferramentas SEM CUSTO (🟢)
Implementar todas as ~72 ferramentas 100% client-side (marcadas 🟢 em `PLANEJAMENTO.md`).
Depois: 🟡 (libs: QR, código de barras, PDF, imagem, OCR) e por fim 🔴 (API/backend serverless).

## SEO (diferencial nº 1)
- Cada ferramenta: rota própria estática, `generateMetadata` (title, description únicos), Open Graph.
- `sitemap.xml` e `robots.txt` gerados.
- Schema.org (`WebApplication`/`SoftwareApplication`) por página.
- Conteúdo textual em cada página (o que é, como usar, FAQ) — texto ranqueia.
- Performance: Core Web Vitals altos, imagens otimizadas, zero JS desnecessário no server component.
- URLs limpas em pt-BR (ex: `/inverter-texto`, `/gerador-de-cpf`) espelhando o invertexto.

## Google AdSense (diferencial nº 2)
- Componente `<AdSlot />` reutilizável (carrega o script do AdSense de forma assíncrona).
- Posições estratégicas por página: topo (abaixo do H1), entre o resultado e o texto explicativo, rodapé.
- Não inserir anúncio antes de conteúdo real (política do AdSense). Layout shift controlado.
- Guardar o publisher ID (`ca-pub-...`) em env var `NEXT_PUBLIC_ADSENSE_CLIENT`.

## Arquitetura sugerida
- `lib/tools.ts` — registro central (slug, nome, categoria, descrição, viabilidade, componente).
- `app/[slug]/page.tsx` — carrega a ferramenta pelo slug + layout comum (H1, AdSlots, texto SEO).
- `app/page.tsx` — home com busca + grid por categoria (espelhar UX do invertexto).
- `components/tools/<Slug>.tsx` — um componente por ferramenta (a lógica portada da referência).

## Comandos
```
npx create-next-app@latest . --ts --tailwind --app --src-dir
npm run dev
```
