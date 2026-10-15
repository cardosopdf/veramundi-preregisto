# Emenda 2 ao protocolo v1: Sky News conta como um só jornal em toda a análise

**Data:** 12 de outubro de 2026, antes de abrir os dados do período. As somas e as manchetes continuam fechadas e ninguém viu valores de tom.
**Emenda:** `preregistos/protocolo-v1.md` e `preregistos/emenda-v1-01.md`. Os dois estão selados e não foram alterados.
**Substitui** a emenda 1 no que toca ao âmbito. A regra é a mesma, mas passa a valer para todas as hipóteses e não só para a H1.

## Razão

`uk-sky` e `uk-sky-uk` são o mesmo jornal: têm a mesma redação e muitas peças em comum. A emenda 1 tratou o efeito na H1. O mesmo par também distorce as outras hipóteses que tratam cada jornal como uma unidade:

- **H4.** Dentro de cada país, os jornais são ordenados pela tensão média nas semanas ímpares e nas pares. Os dois feeds da Sky ficam quase sempre lado a lado nas duas ordens, e isso parece estabilidade entre jornais diferentes quando é o mesmo jornal.
- **H3.** A série de cada país é a média dos seus jornais, por isso a Sky pesa a dobrar na série do Reino Unido.
- **H2.** Não é afetada, porque a Sky não tem secções na H2. Mesmo assim, aplica-se a regra por coerência.

Há ainda uma razão prática: o feed `uk-sky-uk` tem pouco volume. Como jornal à parte, daria horas com poucos títulos e médias com muito ruído.

## O que muda

1. Em toda a análise (H1, H2, H3, H4, nas três variantes e para a tensão e o ânimo), as linhas de `uk-sky-uk` passam a contar como `uk-sky`, um só jornal chamado Sky News.
2. Dentro do jornal fundido aplica-se a regra da emenda 1: o mesmo título normalizado numa janela móvel de 24 horas conta uma vez, e os títulos genéricos ou com menos de 4 palavras não se juntam.
3. Tudo o resto fica como no protocolo v1: critérios de sucesso, correção de Holm, variantes de robustez e publicação.

## Implementação

O código está em `analise/analise-v1-emenda2.mjs`, selado com esta emenda. Junta a Sky (função `fundirSky` da emenda 1) antes de toda a análise do código v1 selado. É este o código que corre no fim do período.

Publicam-se também, ao lado e como informação, os resultados sem esta emenda: o v1 original e o v1 com a emenda 1.
