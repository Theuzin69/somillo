---
id: F-01
titulo: Rolagem de dados
tipo: funcionalidade
etapa: 5
status: rascunho
telas: [T-03, T-06]
atualizado: 2026-11-08
---

# F-01 — Rolagem de dados

> Proposta do Claude, inspirada no Dice Maiden e na notação do Roll20. Revise com atenção a tabela de sintaxe: é ela que vocês vão digitar toda sessão.

## Objetivo

Rolar qualquer combinação de dados digitando um comando no chat (como no Dice Maiden) ou clicando em botões, com resultado justo, detalhado e visível para quem deve ver.

## Histórias

- Como **jogador**, quero digitar `/r 1d20+5 ! Ataque` e ver o resultado detalhado no chat, para que todo mundo acompanhe.
- Como **jogador**, quero rolar com vantagem sem fazer conta, para agilizar o combate.
- Como **mestre**, quero rolar escondido, para que os jogadores não saibam como foi o teste de Furtividade do goblin.
- Como **jogador**, quero rolar `4d6` descartando o menor seis vezes de uma vez, para gerar os atributos de um personagem.
- Como **jogador**, quero salvar as minhas rolagens frequentes, para rolá-las com um clique.

## Como funciona

### Comandos do chat

| Comando | O que faz | Quem vê o resultado |
|---|---|---|
| `/r <expressão>` ou `/roll <expressão>` | rolagem pública | todos |
| `/rs <expressão>` | rolagem secreta | quem rolou e o mestre (se o mestre rolar, só ele) |
| `/w <nome> <mensagem>` | sussurro | quem enviou e o destinatário |
| `/me <ação>` | mensagem de ação: "*Lyra se esconde atrás da pilastra*" | todos |
| `/ajuda` | lista os comandos com exemplos | só quem pediu |
| texto sem `/` | mensagem normal | todos |

### Sintaxe das expressões

| Sintaxe | Significado | Exemplo | Resultado de exemplo |
|---|---|---|---|
| `NdF` | N dados de F faces (sem N, 1 dado) | `3d6`, `d20` | `3d6` → [4, 2, 6] = **12** |
| `d%` | um d100 | `d%` | [73] = **73** |
| `+ - * /` e `( )` | contas; a divisão arredonda para baixo | `(1d8+3)*2` | ([5] + 3) × 2 = **16** |
| `khN` ou `kN` | manter os N maiores | `4d6k3` | [~~1~~, 4, 5, 3] = **12** |
| `klN` | manter os N menores | `2d20kl1` | [~~15~~, 8] = **8** |
| `dlN` / `dhN` | descartar os N menores / maiores | `4d6dl1` | o mesmo que `4d6k3` |
| `e` ou `eN` | explodir: ao tirar o máximo (ou N ou mais), rola mais um dado e soma | `3d6e` | [6!, 2, 3, 1] = **12** |
| `rN` | rerrolar resultados menores ou iguais a N, até sair maior | `2d6r1` | [~~1~~, ~~1~~, 4, 5] = **9** |
| `roN` | rerrolar uma vez só (ex.: Combate com Armas Grandes) | `2d6ro2` | [~~2~~, 1, 6] = **7** |
| `tN` | contar sucessos: cada dado com N ou mais vale 1 | `6d10t7` | [8, 3, 10, 7, 2, 5] = **3 sucessos** |
| `fN` | junto com `t`: cada dado com N ou menos tira 1 sucesso | `6d10t7f1` | [8, 1, 10, 7, 1, 5] = **1 sucesso** |
| `minN` | resultados menores que N contam como N (ex.: Talento Confiável) | `1d20min10+7` | [4→10] + 7 = **17** |
| `vant` / `desv` | atalhos do 5e para `2d20kh1` / `2d20kl1` | `vant+5` | [~~9~~, 17] + 5 = **22** |
| `X <expressão>` | repetir a expressão X vezes (X no começo, seguido de espaço) | `6 4d6k3` | seis linhas, uma por atributo |
| `<expr> ; <expr>` | várias rolagens numa mensagem só | `1d20+5 ; 1d8+3` | duas linhas: acerto e dano |
| ` ! texto` | rótulo da rolagem (com espaço antes do `!`) | `1d20+5 ! Ataque` | "Ataque: [14] + 5 = **19**" |

Na exibição, dados descartados aparecem ~~riscados~~ e dados que explodiram ganham um `!`.

### Ordem de avaliação

Os modificadores valem para o grupo de dados imediatamente antes deles e são aplicados nesta ordem:

1. rerrolagens (`r`, `ro`) e mínimo (`min`);
2. explosões (`e`);
3. manter e descartar (`k`, `kl`, `dl`, `dh`);
4. contagem de sucessos e falhas (`t`, `f`);
5. contas (`*` e `/` antes de `+` e `-`; parênteses primeiro).

### Como o resultado aparece no chat

```text
Lyra rolou 1d20+5 ! Ataque
   Ataque: [14] + 5 = 19
```

- A primeira linha mostra quem rolou, a expressão e o rótulo; a segunda, cada dado e o total em destaque.
- Num d20, o **20 natural** aparece em verde e o **1 natural** em vermelho.
- Passar o mouse sobre o resultado mostra a hora e a expressão completa.
- Rolagem secreta: quem rolou e o mestre veem o resultado com o selo "secreta". Os outros veem só "Lyra fez uma rolagem secreta", sem o resultado (proposta; ver Dúvidas).

### Bandeja de dados

- Botões d4, d6, d8, d10, d12, d20 e d100. Cada clique adiciona um dado ao montador (dois cliques no d6 = `2d6`).
- Campo de modificador (− e +) e seletor **Normal / Vantagem / Desvantagem** (vale para o d20).
- Botões **Rolar** e **Rolar em segredo**; **Limpar** zera o montador.
- Ctrl+clique (Cmd+clique no Mac) num dado rola só aquele dado na hora.

### Minhas rolagens (macros)

- Cada jogador tem, em cada campanha, uma lista de rolagens salvas com nome e expressão. Ex.: "Rapieira: acerto" → `1d20+5 ! Rapieira`.
- Um clique rola; dá para editar, apagar e reordenar.
- A lista fica guardada no servidor do mestre e acompanha o jogador de uma sessão para outra.
- [Etapa 7] As rolagens da ficha complementam esta lista.

## Regras

- Maiúsculas e minúsculas tanto faz (`1D20` = `1d20`). Espaços dentro da expressão são ignorados, exceto o espaço da repetição e o espaço antes do `!`.
- A repetição só vale quando a mensagem começa com um número inteiro, seguido de espaço e de uma expressão com dados.
- **Limites:** até 100 dados por grupo, até 1000 faces, até 20 repetições, até 10 rolagens separadas por `;`, até 100 explosões ou rerrolagens por dado.
- Rolagens impossíveis são recusadas com explicação: `1d1e` (a explosão nunca terminaria), `1d6r6` (todo resultado seria rerrolado).
- Os dados são sorteados **no servidor** do mestre, com gerador criptográfico (`crypto.randomInt`), sem viés.
- Cada rolagem é salva com todos os detalhes (cada dado, descartes, explosões), para o histórico.
- Erros de sintaxe são explicados em português, com uma dica, e não são enviados aos outros:
  - `2d` → "Faltou o número de faces depois do 'd'. Exemplo: 2d6."
  - `1d20+` → "A expressão terminou num '+'. Faltou um número?"
  - `200d6` → "No máximo 100 dados por grupo."
  - `/r` sozinho → mostra uma ajuda curta com exemplos.

## Onde aparece

| Tela | O que muda nela |
|---|---|
| T-03 Mesa | campo do chat aceita os comandos; painel com a bandeja de dados e "Minhas rolagens" |
| T-05 Sessão (sala de espera) | o chat com rolagens já funciona antes de haver cenário |
| T-06 Ficha [Etapa 7] | atributos, perícias e ataques geram rolagens com esta mesma sintaxe |

## Exemplos

Estes casos viram testes automáticos. Os "dados sorteados" são simulados para que o resultado seja previsível.

| Expressão | Dados sorteados (simulados) | Resultado esperado |
|---|---|---|
| `1d20+5` | 14 | 19 |
| `d20` | 20 | 20, destacado como 20 natural |
| `2d20kh1+3` | 7, 15 | 18 (o 7 é descartado) |
| `vant+3` | 7, 15 | 18 |
| `desv` | 7, 15 | 7 |
| `4d6k3` | 1, 4, 5, 3 | 12 |
| `4d6dl1` | 1, 4, 5, 3 | 12 |
| `3d6e` | 6, 3, 1, e o 6 explode em 2 | 12 |
| `2d6r1` | 1, 5; o 1 é rerrolado: 1, de novo: 4 | 9 |
| `2d6ro2` | 2, 6; o 2 é rerrolado uma vez: 1 | 7 (o 1 fica) |
| `6d10t7` | 8, 3, 10, 7, 2, 5 | 3 sucessos |
| `6d10t7f1` | 8, 1, 10, 7, 1, 5 | 1 sucesso (3 − 2) |
| `1d20min10+7` | 4 | 17 |
| `(1d8+3)*2` | 5 | 16 |
| `7/2` | — | 3 |
| `6 4d6k3` | — | seis resultados separados |
| `1d20+5 ; 1d8+3 ! Ataque` | 14 ; 6 | rótulo "Ataque", 19 e 9 |
| `2d` | — | erro: "Faltou o número de faces…" |
| `101d6` | — | erro: "No máximo 100 dados por grupo." |
| `1d1e` | — | erro: a explosão nunca terminaria |
| `1d6r6` | — | erro: todo resultado seria rerrolado |

## Critérios de aceite

- [ ] Todos os casos da tabela de Exemplos passam nos testes automáticos.
- [ ] **Dado** um milhão de rolagens de `1d20`, **quando** conto os resultados, **então** cada face sai entre 4,9% e 5,1% das vezes.
- [ ] **Dado** que o jogador A faz `/rs 1d20`, **quando** o jogador B olha o chat, **então** B não vê o resultado.
- [ ] **Dado** que o mestre faz `/rs 1d20`, **quando** qualquer jogador olha o chat, **então** ninguém além do mestre vê o resultado.
- [ ] **Dado** que digito `/r 2d`, **quando** envio, **então** vejo o erro explicado e nada é enviado aos outros.
- [ ] **Dado** que salvei a rolagem "Rapieira", **quando** entro na sessão da semana seguinte, **então** ela continua na minha lista.
- [ ] **Dado** que monto `2d6 + 3` na bandeja, **quando** clico em **Rolar**, **então** o chat mostra a rolagem `2d6+3` com os dados detalhados.

## Fora do escopo

- Dados 3D animados (seção 12 da especificação).
- Rolagens no meio do texto, como `Eu ataco [[1d20+5]]` (proposta para depois).
- Rolar pelo Discord (seção 12).

## Dúvidas em aberto

> ❓ **Dúvida:** o mestre deve ver os sussurros entre jogadores?

> ❓ **Dúvida:** numa rolagem secreta, os outros veem o aviso "Fulano fez uma rolagem secreta" ou não veem nada?

> ❓ **Dúvida:** vocês usam alguma sintaxe do Dice Maiden que não está nesta tabela?
