# toollist

Hub de ferramentas online (utilitários web) — clone funcional inspirado no invertexto.com.

**Stack:** Next.js (App Router) + Tailwind CSS + TypeScript
**Deploy:** Vercel + domínio próprio
**Modelo:** ferramentas client-side (custo de operação ~zero) + Google AdSense em pontos estratégicos.

## Diferenciais do projeto
1. **SEO forte** — cada ferramenta é uma rota estática/SSG com metadata própria, schema.org, sitemap, conteúdo textual e performance alta (é assim que o invertexto ranqueia).
2. **Monetização com Google AdSense** — blocos de anúncio em posições estratégicas de cada página (topo, entre resultado e descrição, rodapé), sem quebrar UX.
3. **Escala** — registro central de ferramentas; adicionar uma nova = criar 1 arquivo.

## Status
- [x] Planejamento e catálogo completo → `PLANEJAMENTO.md`
- [x] Estratégia de execução → `CLAUDE.md`
- [x] Scaffold Next.js + Tailwind
- [x] Primeira ferramenta no ar: `consulta-cnpj` (via BrasilAPI, gratuita) — saiu de ordem por demanda (era 🔴, virou viável)
- [ ] Fase 1: implementar as demais ferramentas sem custo (🟢)
- [ ] Integração Google AdSense
- [ ] SEO (sitemap, metadata, schema.org)
- [x] Deploy Vercel + domínio `toollist.eullerlolato.com`

## Fase 1 (primeira ação)
Implementar **todas as ferramentas sem custo (🟢)** — ~72 ferramentas 100% client-side.
Detalhes e lista em `PLANEJAMENTO.md`.

## Referência
Captura completa do site de referência (invertexto) está no repo privado
**[oileer/referencias](https://github.com/oileer/referencias)**, pasta `invertexto/`
(HTML, CSS, JS e prints de 131 páginas). Ver `CLAUDE.md` para a estratégia de reaproveitamento.
