---
id: T-02
titulo: Campanha (cenários)
tipo: tela
etapa: 1
status: rascunho
quem-ve: [mestre]
atualizado: 2026-11-08
---

# T-02 — Campanha (cenários)

> Exemplo preenchido pelo Claude a partir da sua descrição inicial. Revise, corrija o que não for como você imagina e, quando concordar com tudo, mude o `status` para `pronto`.

## Objetivo

É a central de uma campanha para o mestre. Aqui ficam os cenários (Casa do Personagem 1, Masmorra Final, Floresta Mágica…) e, a partir da Etapa 2, é daqui que ele abre a sessão.

## Quem usa

- **Mestre:** só ele.
- **Jogador:** nunca vê esta tela; entra direto na sala de espera ou na Mesa.

## Como se chega aqui

- Clicando num cartão de campanha na [T-01 Início](T-01-inicio.md).
- Logo depois de criar uma campanha.
- Pelo botão **Voltar à campanha** da Mesa [Etapa 3].

## O que a tela mostra

| # | Elemento | O que mostra / como é |
|---|---|---|
| 1 | Cabeçalho | **← Início**, o nome da campanha e, à direita, o botão **Abrir sessão** [Etapa 2]. Com a sessão aberta, o botão vira o indicador "Sessão aberta · 3 jogadores", que abre o painel da sessão (T-05). |
| 2 | Abas | **Cenários** (Etapa 1). Outras abas surgem nas etapas seguintes: **Personagens** [Etapa 7], **Diário** [Etapa 10] e **Áudio** [Etapa 11]. Só aparecem as abas já implementadas. |
| 3 | Barra da aba Cenários | Botão **+ Novo cenário** e campo de busca por nome (proposta). |
| 4 | Cartões de cenário | Miniatura do mapa (ou a cor de fundo), nome e tamanho da imagem (ex.: "4096 × 4096"). [Etapa 3] Selo "Jogadores aqui" no cenário que os jogadores estão vendo. |

## O que dá para fazer

| Ação | Resultado |
|---|---|
| **← Início** | Volta para a T-01. |
| **+ Novo cenário** | Abre a janela "Novo cenário" (ver Regras). Ao criar, o cartão aparece no fim da lista. |
| Arrastar uma imagem do computador para a tela | Cria um cenário com aquela imagem, usando o nome do arquivo (`masmorra-final.png` vira "Masmorra final"), e já abre a janela de edição para ajustes. |
| Clicar num cartão | Na Etapa 1: abre a pré-visualização do mapa em tela cheia (roda do mouse dá zoom, arrastar move, **Esc** fecha). A partir da Etapa 3: abre a T-03 Mesa naquele cenário. |
| Arrastar um cartão | Muda a ordem dos cenários; a nova ordem é salva. |
| Botão **⋯** do cartão, ou clique direito nele | Menu com **Editar**, **Duplicar** e **Excluir**; [Etapa 3] **Mostrar aos jogadores**. |
| **Editar** | Abre a janela do cenário já preenchida. |
| **Duplicar** | Cria "Nome (cópia)" logo depois do original, com o mesmo mapa e as mesmas notas. A imagem não é copiada de novo no disco (ver seção 4.6 da especificação). |
| **Excluir** | Confirmação simples: "Excluir o cenário Masmorra Final? Tokens e névoa dele também serão excluídos." |
| Clicar no nome da campanha | Permite renomeá-la ali mesmo. |
| **Abrir sessão** [Etapa 2] | Abre a escolha do modo de conexão (seção 5.2 da especificação). |

## Estados especiais

- **Vazio** (campanha sem cenários): "Nenhum cenário ainda. Crie o primeiro ou arraste uma imagem de mapa para cá." e o botão **+ Novo cenário**.
- **Imagem não suportada ou grande demais:** mensagem explicando o limite (PNG, JPG ou WebP, até 50 MB); o cenário não é criado.
- **Imagem sendo processada** (mapas grandes): o cartão aparece com um indicador de carregamento até a miniatura ficar pronta.
- **Arquivo do mapa sumiu** da pasta da campanha: o cartão mostra ⚠️ "Mapa não encontrado" e a opção **Trocar imagem**.

## Regras

- Janela "Novo cenário" / "Editar cenário":
  - **Nome**: obrigatório, até 80 caracteres;
  - **Fundo**: **Imagem do mapa** (escolher ou arrastar) **ou** **Cor sólida** (para cenas sem mapa, como um diálogo);
  - **Notas do mestre**: opcional, texto livre; nunca aparecem para os jogadores.
- Trocar a imagem de um cenário mantém o nome e as notas. [Etapa 4] Os tokens continuam nas mesmas posições.
- A ordem inicial é a de criação; arrastar muda a ordem.
- Tudo é salvo automaticamente.
- Cenários de exemplo da Maldição Cavérica: Casa do Personagem 1, Casa do Personagem 2, Masmorra Final, Floresta Mágica.

## Diferenças entre mestre e jogador

Tela exclusiva do mestre.

## Esboço

```text
┌──────────────────────────────────────────────────────────────────┐
│ ← Início   Maldição Cavérica                   [Abrir sessão >]  │
├──────────────────────────────────────────────────────────────────┤
│  [Cenários]   Personagens   Diário   Áudio                       │
├──────────────────────────────────────────────────────────────────┤
│  [+ Novo cenário]                         Buscar: [__________]   │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ │
│  │ (miniatura)  │ │ (miniatura)  │ │ (miniatura)  │ │ (minia-  │ │
│  │              │ │              │ │              │ │  tura)   │ │
│  ├──────────────┤ ├──────────────┤ ├──────────────┤ ├──────────┤ │
│  │ Casa do      │ │ Casa do      │ │ Masmorra     │ │ Floresta │ │
│  │ Personagem 1 │ │ Personagem 2 │ │ Final      … │ │ Mágica   │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────┘ │
│                                                                  │
│  (arraste uma imagem de mapa para cá para criar um cenário)      │
└──────────────────────────────────────────────────────────────────┘
```

## Critérios de aceite

- [ ] **Dado** uma campanha sem cenários, **quando** abro a campanha, **então** vejo o estado vazio com o botão **+ Novo cenário**.
- [ ] **Dado** que criei "Masmorra Final" com uma imagem, **quando** fecho a janela, **então** o cartão aparece no fim da lista com a miniatura do mapa.
- [ ] **Dado** que arrasto `floresta-magica.jpg` para a tela, **quando** solto o arquivo, **então** o cenário "Floresta magica" é criado e a janela de edição abre para eu corrigir o nome.
- [ ] **Dado** que estou na janela "Novo cenário", **quando** deixo o nome em branco, **então** o botão **Criar** fica desabilitado.
- [ ] **Dado** que escolho uma imagem de 80 MB, **quando** tento criar o cenário, **então** vejo a mensagem do limite de 50 MB e nada é criado.
- [ ] **Dado** quatro cenários, **quando** arrasto o último para o primeiro lugar e reinicio o app, **então** a nova ordem se mantém.
- [ ] **Dado** que duplico "Casa do Personagem 1", **quando** olho a lista, **então** "Casa do Personagem 1 (cópia)" aparece logo depois do original e a pasta `arquivos/` não ganha uma segunda cópia da imagem.
- [ ] **Dado** que excluí um cenário e confirmei, **quando** reinicio o app, **então** ele não volta.
- [ ] **Dado** que clico num cartão (Etapa 1), **quando** a pré-visualização abre, **então** consigo dar zoom e mover o mapa, e **Esc** fecha.
- [ ] **Dado** um cenário com fundo de cor sólida, **quando** olho o cartão, **então** vejo a cor no lugar da miniatura.

## Fora do escopo

- Grade, calibração e tokens (Etapas 3 e 4).
- Mostrar o cenário aos jogadores (Etapa 3).
- Pastas de cenários (pergunta Q-09).

## Dúvidas em aberto

> ❓ **Dúvida:** os cenários precisam de pastas (Ato 1, Ato 2…)? É a pergunta Q-09 da especificação.

> ❓ **Dúvida:** uma masmorra com vários andares é um cenário com vários mapas ou um cenário por andar? Proposta do Claude: um cenário por andar, que é mais simples e já resolve.
