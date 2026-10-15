# Emenda 1 ao protocolo v1 — Sky News conta como um só jornal na H1

**Data:** 12 de outubro de 2026, antes de abrir os dados do período (as somas e as manchetes continuam fechadas; ninguém viu valores de tom).
**Protocolo emendado:** `preregistos/protocolo-v1.md` (selado, não alterado). Esta emenda é um documento à parte, com selo próprio.
**Lista de fontes:** `fontes/lista-v1.json` (selada, não alterada). A recolha continua igual.

## Razão

A lista v1 tem duas entradas da Sky News no Reino Unido: `uk-sky` (feed geral) e `uk-sky-uk` (feed das notícias do Reino Unido). São o mesmo jornal, com a mesma redação e muitas peças em comum. Na H1, que compara a correlação entre jornais do mesmo país com a correlação entre países, este par conta como dois jornais diferentes do Reino Unido. A correlação entre dois feeds da mesma redação é alta por construção, não por fiabilidade da medida, e por isso inflaciona a média dentro do país e favorece a H1.

## O que muda

1. **Na H1**, em todas as variantes (principal, cópias juntas e sem os jornais com desporto inseparável), as linhas de `uk-sky-uk` passam a contar como `uk-sky`, um só jornal chamado Sky News. Ficam assim 4 jornais em vez de 5 no Reino Unido, na H1.
2. Dentro do jornal fundido, o mesmo título normalizado (a mesma normalização do código v1) visto mais do que uma vez numa janela móvel de 24 horas conta uma vez. Os títulos genéricos ou com menos de 4 palavras, que a variante das cópias juntas já ignora, também não se juntam aqui. As peças com o mesmo endereço já contavam uma vez desde a recolha, porque a chave do endereço é comum a todas as fontes.
3. Tudo o resto fica como no protocolo v1: H2, H3, H4, correção de Holm (agora com o valor-p da H1 emendada), critérios de sucesso, variantes de robustez e publicação.
4. Escolheu-se juntar o par em vez de o excluir, para não retirar ao Reino Unido a Sky News, a única fonte classificada como "Least Biased" pelo MBFC no país.

## Implementação

`analise/analise-v1-emenda1.mjs`, selado com esta emenda. Usa as funções do código v1 selado (`analise/analise-v1.mjs`, não alterado) e só muda as séries que entram na H1. É este o código que corre no fim do período.

Publica-se também o resultado da H1 sem a emenda (v1 original), ao lado, como informação.

## Lista v2 (depois do período)

Na lista v2 fica só uma entrada da Sky News.
