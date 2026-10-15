# Veramundi · pré-registo público / public pre-registration

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23393215.svg)](https://doi.org/10.5281/zenodo.23393215)

**DOI (todas as versões / all versions):** [10.5281/zenodo.23393215](https://doi.org/10.5281/zenodo.23393215) · primeira versão arquivada / first archived version: v1.0.3, [10.5281/zenodo.23393216](https://doi.org/10.5281/zenodo.23393216)

**PT** · Este repositório guarda, com data pública, o método do [Veramundi](https://veramundi.com) **antes** de se verem os resultados: o protocolo de análise e as emendas, o léxico de tom, as listas de fontes, as regras e o registo de impressões digitais SHA-256. Cada versão é arquivada no Zenodo com um DOI, o que dá uma data independente que ninguém pode alterar.

**EN** · This repository holds, with a public date, the method of [Veramundi](https://veramundi.com) **before** any results are seen: the analysis protocol and its amendments, the tone lexicon, the source lists, the rules and the register of SHA-256 fingerprints. Each version is archived on Zenodo with a DOI, giving an independent date that no one can change.

## Primeiro período / first period

- **12 out 2026, 02:00 UTC → 7 dez 2026, 02:00 UTC.** Recolha às cegas: o tom é medido e guardado, mas ninguém vê os valores até ao fim. / Blind collection: tone is measured and stored, but no one sees the values until the end.
- Hipóteses H1–H4: `preregistos/protocolo-v1.md`, com as emendas 1 e 2 (antes de abrir os dados). / Hypotheses H1–H4, with amendments 1 and 2 (made before opening the data).
- No fim do período publicam-se todos os resultados, os que passam e os que falham. / At the end, all results are published, those that pass and those that fail.

## O que está aqui / what is here

| Ficheiro / file | Conteúdo / content |
|---|---|
| `REGISTO.md` | Registo dos selos: data, ficheiro, modo e SHA-256 (extrato público do registo original). / Seal register (public extract). |
| `preregistos/` | Protocolo v1 e emendas 1 e 2. / Protocol v1 and amendments. |
| `lexico/` | Léxico v1 (PT e EN) e famílias de palavras. / Lexicon v1 and word families. |
| `fontes/` | Lista de jornais v1, lista de cobertura alargada cob-1, regra de escolha de fontes e contexto dos RSF 2026. / Source lists, selection rule and RSF context. |
| `sinteses/` | Instruções das sínteses e dos resumos das histórias escritos por IA (nunca entram na medida). / Instructions for AI-written summaries and story summaries (never part of the measure). |
| `selos/selos-diarios.csv` | Impressão digital SHA-256 de cada dia de dados, gravada depois de o dia fechar. / Daily SHA-256 fingerprint of each day of data. |
| `verificar.mjs` | Confere as impressões digitais. / Checks the fingerprints. |

**O código da análise** (`analise/*.mjs`) está selado no `REGISTO.md`, mas só é publicado depois de 7 dez 2026; nessa altura qualquer pessoa pode confirmar que é o mesmo ficheiro. / **The analysis code** is sealed in `REGISTO.md` but published only after 7 Dec 2026; anyone can then confirm it is the same file.

## Como verificar / how to verify

```bash
node verificar.mjs
```

Ou à mão / or by hand:
- ficheiros em modo `bytes`: `sha256sum preregistos/protocolo-v1.md`;
- ficheiros em modo `json-canónico`: SHA-256 de `JSON.stringify(JSON.parse(conteúdo))` em UTF-8 (sem espaços nem quebras de linha).

Os selos diários só podem ser recalculados depois de 7 dez 2026, quando os dados completos forem publicados. / Daily seals can only be recomputed after 7 Dec 2026, when the full data is published.

## Regras do projeto / project rules

Só se mostram títulos e ligações, nunca o texto dos artigos; o número medido vem sempre do léxico selado, nunca de um modelo de linguagem; nada selado é alterado (uma correção é uma versão nova, com selo novo). / Only headlines and links are shown, never article text; the measured number always comes from the sealed lexicon, never from a language model; nothing sealed is changed.

## Autor e licença / author and licence

Pedro Diogo Faria Figueira Cardoso · <info@veramundi.com> · Licença / licence: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (ver / see `LICENSE.md`).
