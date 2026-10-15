# Veramundi — protocolo de pré-registo, versão 1

Selado a 12 out 2026, antes de qualquer pessoa ver valores de tom. Titular: Pedro Diogo Faria Figueira Cardoso.
Nada selado se altera: uma correção é uma versão nova (`protocolo-v2.md`), com selo novo. O teste `test/selos.test.mjs` recalcula todos os selos em cada publicação.

## 0. O que se testa
Estas hipóteses não são as do The Orrery Index: aqui não há Lua nem astrologia. Testam uma pergunta prévia: **o sinal do léxico mede alguma coisa real, ou é ruído?** Só um sinal que passe estes testes pode ser cruzado com hipóteses simbólicas no Orrery, ou vendido como produto de dados.

## 1. Instrumentos selados
- **Léxico:** `lexico/lexico-v1.json`, SHA-256 `703ab82bf1e5f9354da4a0eb05b6d4ec4b6e59a27a24b5a4e30ba115c8d4da04` (selado a 12 out 2026, 01:36 UTC). Aplica-se só ao título de cada notícia.
- **Lista de fontes:** `fontes/lista-v1.json`, com 21 jornais de PT, BR, US e UK. Inclui a inclinação de cada jornal e as secções usadas na H2. O SHA está em `preregistos/REGISTO.md`.
- **Código de análise:** escrito e selado **antes de abrir os dados**, e sempre antes de 7 dez 2026. Implementa só o que este protocolo descreve.

## 2. Dados válidos e período
- **Só contam linhas com `lexico_sha` = `703ab82b…`.** Tudo o que foi medido antes fica fora de qualquer análise: o léxico `0-teste`, a amostra de calibração de 1076 manchetes de 11-12 out e as primeiras horas da recolha.
- **Primeiro período:** 8 semanas (56 dias), de **12 out 2026 às 02:00 UTC** a **7 dez 2026 às 02:00 UTC**. É a primeira hora completa medida com o léxico v1 em produção (registado na D1, tabela `lexicos`, às 01:42 UTC).
- **Listas de fontes válidas:** a `1-rascunho.5` (SHA `3eebead9cc79…`), ativa desde 12 out às 01:42 UTC, e a v1, ativada logo a seguir a esta publicação. A v1 só acrescenta a inclinação e as secções da H2. Os endereços, as exclusões e os cabeçalhos são iguais, por isso a recolha é idêntica e as linhas das duas listas contam.
- **Durante o período não se muda nada:** léxico, lista de fontes, regras de contagem e código de recolha ficam como estão. A exceção são correções técnicas que não mudam o que é medido (por exemplo, uma fonte que muda de endereço). Cada uma fica registada com data no `REGISTO.md`. Uma fonte que morre fica como falhada e não é substituída.

## 3. Regras de contagem
1. **Repetições dentro do mesmo jornal:** o mesmo título normalizado (minúsculas, sem acentos nem pontuação) com outro endereço conta uma vez. É um defeito do feed, não exposição real.
2. **Itens que não são artigos** ficam fora, pelo endereço: os noticiários horários da Antena 1 (`/noticiario-`) e os podcasts do Expresso (`/podcasts/`).
3. **Desporto fora da medida:** as secções de desporto são excluídas pelo endereço em 16 dos 21 jornais (campo `excluir` da lista). O Observador, a NPR, a PBS e a Sky News não as separam no endereço. Nesses jornais, o desporto que aparecer conta. É uma limitação declarada.
4. **Peças de agência (Lusa) repetidas por vários jornais:** a recolha não as junta. A medida principal usa todas as manchetes, porque é isso que mede a exposição do leitor. A junção é só verificação de robustez (secção 6).
5. **Negação e ironia não são tratadas.** São ruído constante, declarado.

## 4. Unidades e normalização
- **Taxa de tensão** = soma de tensão ÷ número de títulos, por jornal × hora UTC. Calcula-se o mesmo para o **ânimo**.
- **Horas com menos de 3 títulos** num jornal ficam "sem dados", nunca zero.
- **Normalização:** a cada série subtrai-se a média da sua célula hora do dia × dia da semana, calculada dentro do período.
- **Valores diários:** média das horas válidas desse dia, só nos dias com pelo menos 8 horas válidas.

## 5. Hipóteses e critérios de sucesso

### H1 — Fiabilidade entre jornais do mesmo país
- **Teste:** média das correlações de Spearman da tensão diária normalizada entre todos os pares de jornais do mesmo país.
- **Comparação:** a mesma média entre pares de jornais de países diferentes.
- **Sucesso:** média dentro do país > 0,20, **e** maior do que entre países, num teste de permutação unilateral (10 000 permutações dos rótulos de país, semente 8, p < 0,05).

### H2 — Validade de conteúdo pelas secções
- **Teste:** taxa de tensão dos títulos das secções duras (mundo, política, justiça) contra as secções leves (cultura, estilo de vida, entretenimento). As secções são as do campo `seccoes_h2` da lista v1, em 9 jornais.
- **Sucesso:** taxa das duras maior do que a das leves em pelo menos 75% dos jornais com pelo menos 30 títulos em cada grupo, **e** no conjunto (Mann-Whitney unilateral sobre os títulos, p < 0,05).

### H3 — Resposta a acontecimentos súbitos
- **Acontecimentos**, por regra externa e cega:
  - sismos de magnitude ≥ 6,0 do catálogo do USGS, com epicentro a menos de 300 km de um dos 4 países cobertos;
  - acontecimentos com ≥ 10 mortos num desses países, listados na Wikipedia em inglês ("Portal:Current events") no período.
- A lista é construída por regra, sem olhar para o sinal.
- **Teste:** tensão horária normalizada média do país nas 24 horas a seguir ao acontecimento contra as 24 horas anteriores.
- **Sucesso:** subida em pelo menos 70% dos acontecimentos (teste dos sinais unilateral, p < 0,05).
- **Com menos de 5 acontecimentos,** a H3 é "sem dados suficientes", não falhada.

### H4 — Estabilidade da diferença entre jornais
- **Teste:** dentro de cada país, ordenar os jornais pela taxa média de tensão nas semanas ímpares do período e, à parte, nas semanas pares. Calcular a correlação de Spearman entre as duas ordens.
- **Sucesso:** média das correlações por país ≥ 0,6.

### Regras comuns
- **Correção para vários testes:** Holm sobre H1 a H4, com alfa conjunto de 0,05. A H4 não tem valor-p e entra só pelo seu limiar.
- **O ânimo** é reportado sempre ao lado da tensão, como análise secundária, e não entra nos critérios de sucesso.

## 6. Robustez
Cada hipótese repete-se em duas variantes. Um resultado só se dá como sólido se aguentar a versão principal e as duas variantes.
1. **Cópias entre jornais juntas:** o mesmo título normalizado, no mesmo país, numa janela móvel de 24 horas, conta uma vez. Na junção ignoram-se:
   - os títulos com menos de 4 palavras normalizadas;
   - os títulos que contenham "ultima hora", "em direto", "ao minuto", "live", "breaking", "as it happened", "resultados", "results" ou "newsletter".
2. **Sem os quatro jornais** em que o desporto não é separável: Observador, NPR, PBS e Sky News.

## 7. Indicadores descritivos (não são hipóteses)
- **Eco:** em quantos jornais diferentes do mesmo país saiu cada peça. Mede a concentração da agenda.
- **Divergência entre jornais:** diferença da taxa de tensão de cada jornal face à média do seu país.

## 8. Publicação
Publicam-se todos os resultados, os que passam e os que falham, com:
- o SHA do léxico, da lista e do código de análise;
- os valores-p;
- as variantes de robustez.

O site não mostra valores de tom antes do fim do período e da publicação destes resultados.

## 9. Limitações declaradas
- A medida é o tom das **manchetes**, não dos artigos, e mede o tom do texto, não a inclinação de quem o escreve.
- Só PT e EN, e quatro países, com 4 a 6 jornais cada.
- **Inclinação:** 10 dos 21 jornais não têm classificação no MBFC nem no AllSides. Ficam registados "sem classificação externa", sem classificação inventada. No caso da CBS, o MBFC e o AllSides discordam.
- A Lusa não tem feed público. As peças de agência só se identificam indiretamente, pela repetição entre jornais.
- As fontes especializadas em defesa ficam para a lista v2 e o segundo período.
