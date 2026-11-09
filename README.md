# Somillo — Mesa de RPG

*Somillo — RPG Table*

Mesa de RPG virtual caseira para jogar com os amigos: o mestre hospeda a mesa no próprio computador e os jogadores só clicam em **Entrar em uma mesa**. Junta a simplicidade do Owlbear Rodeo, a mesa completa do Roll20, as fichas do D&D Beyond e os comandos de dados do Dice Maiden.

> 🚧 **Em especificação.** Ainda não há código nem instaladores. O plano completo está em [Especificacao-Somillo.pdf](especificacao/Especificacao-Somillo.pdf).

## Como vai funcionar

- **Sem servidor na nuvem:** o mestre guarda tudo da campanha (mapas, tokens, fichas, chat) no próprio PC e abre a sessão quando é dia de jogo.
- **Sem configurar roteador:** a conexão pela internet usa um túnel automático; o mestre manda o convite no Discord e os jogadores colam.
- **Windows, macOS e Linux**, com instaladores gerados automaticamente a cada versão.
- **Feito para D&D 5e:** fichas com cálculos automáticos e rolagens com um clique.

## Documentos

| Documento | Para quê |
|---|---|
| [Especificação (PDF)](especificacao/Especificacao-Somillo.pdf) | ler tudo de uma vez |
| [Especificação (Markdown)](especificacao/ESPECIFICACAO.md) | documento mestre: visão, arquitetura, rede, distribuição, etapas |
| [Como escrever](especificacao/COMO-ESCREVER.md) | guia para escrever telas e funcionalidades |
| [Telas](especificacao/telas/) e [Funcionalidades](especificacao/funcionalidades/) | detalhes de cada parte do app |

## Estrutura

```text
somillo/
├── CLAUDE.md               instruções para o Claude
├── especificacao/          especificação (Markdown + PDF)
│   ├── modelos/            modelos para novas telas e funcionalidades
│   ├── telas/              T-xx: uma tela por arquivo
│   ├── funcionalidades/    F-xx: uma funcionalidade por arquivo
│   └── imagens/            esboços
└── ferramentas/gerar-pdf/  gera o PDF a partir dos .md
```

## Downloads

Os instaladores vão aparecer em [Releases](https://github.com/Theuzin69/somillo/releases) a partir da Etapa 0.
