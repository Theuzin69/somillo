# Somillo — instruções para o Claude

App desktop de mesa de RPG virtual (Owlbear Rodeo + Roll20 + D&D Beyond + Dice Maiden) para um grupo de amigos. O mestre hospeda o servidor no próprio PC; os jogadores conectam. Campanha de estreia: Maldição Cavérica (D&D 5e). Nome de exibição: "Somillo — Mesa de RPG" (pt-BR) / "Somillo — RPG Table" (en).

## Fonte da verdade

- `especificacao/ESPECIFICACAO.md`: documento mestre (arquitetura, rede, distribuição, roteiro das etapas 0–12, decisões D-xx, perguntas Q-xx).
- `especificacao/telas/T-*.md` e `especificacao/funcionalidades/F-*.md`: detalhes escritos pelo usuário. Com `status: pronto`, vencem o roteiro em caso de conflito.
- `especificacao/COMO-ESCREVER.md`: formato desses arquivos (cabeçalho YAML, seções, ciclo de status).

Antes de programar qualquer etapa, leia o documento mestre inteiro e todos os arquivos ligados à etapa.

## Regras de trabalho

- Não implementar uma etapa antes do *Definition of Ready* (seção 9.1): arquivos da etapa com `status: pronto`, perguntas Q-xx que a bloqueiam respondidas, etapa anterior `testado`. Se faltar algo, pergunte em vez de inventar.
- Respeitar o "Fora do escopo" de cada etapa e arquivo. Ideias extras vão para a seção 12 da especificação ou viram pergunta.
- Uma etapa por branch (`etapa-N-nome`), com PR para `main`. Depois do commit inicial, nada vai direto para a `main`.
- Ao terminar uma etapa: marcar os arquivos dela como `implementado`, atualizar a especificação com o que mudou, regenerar o PDF.
- Qualquer mudança em `.md` da especificação → regenerar o PDF no mesmo commit.
- Ao responder uma dúvida `> ❓` num arquivo do usuário, escrever `> 💬 **Claude:**` logo abaixo, sem apagar a dúvida.

## Convenções (D-08)

- Código, identificadores, mensagens do protocolo e tabelas do banco: inglês.
- Textos da interface: pt-BR via i18next (nada de texto fixo nos componentes).
- Documentação e mensagens de commit: pt-BR.
- TypeScript `strict`; Zod em tudo o que cruza a rede; `src/server` nunca importa Electron.
- O mestre usa o próprio servidor por `ws://127.0.0.1`, pelo mesmo protocolo dos jogadores.
- Segredos (tokens ocultos, névoa, notas do mestre, rolagens secretas) são filtrados no servidor; nunca enviar ao cliente o que ele não pode ver.

## Estado atual

- Fase: especificação, sem código. Próximo passo: o usuário revisa a especificação, responde Q-01..Q-12 e aprova a Etapa 0.

## Comandos

- Gerar o PDF da especificação: `npm --prefix ferramentas/gerar-pdf install` (primeira vez) e `npm --prefix ferramentas/gerar-pdf run pdf`.
- Comandos do app: serão adicionados na Etapa 0.
