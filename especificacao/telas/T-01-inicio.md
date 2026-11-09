---
id: T-01
titulo: Início (hub de campanhas)
tipo: tela
etapa: 1
status: rascunho
quem-ve: [mestre, jogador]
atualizado: 2026-11-08
---

# T-01 — Início (hub de campanhas)

> Exemplo preenchido pelo Claude a partir da sua descrição inicial. Revise, corrija o que não for como você imagina e, quando concordar com tudo, mude o `status` para `pronto`.

## Objetivo

É a primeira tela ao abrir o Somillo. Mostra as campanhas que eu mestro e é a porta de entrada para a mesa de outra pessoa.

## Quem usa

- **Mestre:** vê e gerencia as campanhas guardadas no computador dele.
- **Jogador:** usa principalmente o botão **Entrar em uma mesa** [Etapa 2]. Se não mestra nenhuma campanha, vê a lista vazia.

## Como se chega aqui

- Ao abrir o app.
- Pelo logo do Somillo, no canto superior esquerdo de qualquer tela. Se houver uma sessão aberta, o app pede confirmação antes de sair dela [Etapa 2].

## O que a tela mostra

| # | Elemento | O que mostra / como é |
|---|---|---|
| 1 | Cabeçalho | À esquerda, logo e nome "Somillo — Mesa de RPG". À direita: botão **Entrar em uma mesa** [Etapa 2], perfil com avatar e nome [Etapa 2] e botão **Configurações**. |
| 2 | Título | "Minhas campanhas". |
| 3 | Cartões de campanha | Um por campanha: capa, nome, número de cenários e "aberta há 3 dias". A campanha aberta mais recentemente vem primeiro. |
| 4 | Cartão **+ Nova campanha** | Sempre depois do último cartão. |
| 5 | Rodapé | Versão do app (ex.: "v0.1.0"). Clicar abre a tela Sobre (T-00). |

## O que dá para fazer

| Ação | Resultado |
|---|---|
| Clicar num cartão de campanha | Abre a [T-02 Campanha](T-02-campanha.md) daquela campanha. |
| Clicar em **+ Nova campanha** | Abre a janela "Nova campanha" (ver Regras). Ao clicar em **Criar**, a campanha é criada e a T-02 dela abre. |
| Botão **⋯** do cartão, ou clique direito nele | Menu com **Editar**, **Abrir pasta da campanha** e **Excluir**. |
| **Editar** | Abre a mesma janela da criação, já preenchida. **Salvar** aplica as mudanças. |
| **Abrir pasta da campanha** | Abre a pasta da campanha no Explorador de Arquivos, no Finder ou no gerenciador de arquivos do Linux. |
| **Excluir** | Pede para digitar o nome da campanha. Confirmado, a campanha sai da lista e a pasta dela vai para `Somillo/lixeira`. |
| **Entrar em uma mesa** [Etapa 2] | Abre a T-04 Entrar em uma mesa. |
| **Configurações** | Abre a T-07 Configurações. |

## Estados especiais

- **Vazio** (nenhuma campanha): ilustração, o texto "Você ainda não tem campanhas" e um botão grande **Criar minha primeira campanha**. A partir da Etapa 2, também: "Vai jogar na mesa de alguém? Clique em **Entrar em uma mesa**."
- **Carregando:** cartões cinza no lugar dos reais. Quase nunca aparece, porque a lista é local.
- **Erro ao ler a pasta de dados** (pasta apagada, pen drive removido): mensagem explicando o problema e os botões **Tentar de novo** e **Escolher outra pasta**.
- **Campanha danificada:** o cartão aparece com um aviso ⚠️ e a opção **Restaurar backup**, que usa os backups automáticos (RF-1.6). (proposta)

## Regras

- Janela "Nova campanha":
  - **Nome**: obrigatório, até 80 caracteres;
  - **Descrição**: opcional, até 500 caracteres;
  - **Capa**: opcional; escolher um arquivo ou arrastar uma imagem para a janela.
- Sem capa, o app gera uma com as iniciais da campanha sobre uma cor.
- Capa: PNG, JPG ou WebP de até 20 MB. O app guarda uma cópia, então o arquivo original pode ser apagado depois.
- Duas campanhas podem ter o mesmo nome; o app só avisa.
- Na primeira versão teremos só a **Maldição Cavérica**, mas a tela já suporta várias campanhas.

## Diferenças entre mestre e jogador

Nenhuma. O app é o mesmo para todos: "mestre" é simplesmente quem tem campanhas no próprio computador. A mesma pessoa pode mestrar uma campanha e jogar na de outra.

## Esboço

```text
┌──────────────────────────────────────────────────────────────────┐
│ Somillo — Mesa de RPG   [Entrar em uma mesa] (Seu nome) [Config] │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Minhas campanhas                                                │
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐                          │
│  │                │  │                │                          │
│  │     (capa)     │  │       +        │                          │
│  │                │  │ Nova campanha  │                          │
│  ├────────────────┤  │                │                          │
│  │ Maldição     … │  │                │                          │
│  │ Cavérica       │  │                │                          │
│  │ 4 cenários     │  │                │                          │
│  │ há 3 dias      │  │                │                          │
│  └────────────────┘  └────────────────┘                          │
│                                                                  │
│                                                           v0.1.0 │
└──────────────────────────────────────────────────────────────────┘
```

## Critérios de aceite

- [ ] **Dado** que não existe nenhuma campanha, **quando** abro o app, **então** vejo o estado vazio com o botão **Criar minha primeira campanha**.
- [ ] **Dado** que estou na janela "Nova campanha", **quando** deixo o nome em branco, **então** o botão **Criar** fica desabilitado e o campo mostra "Dê um nome à campanha".
- [ ] **Dado** que criei "Maldição Cavérica" com uma capa, **quando** volto ao Início, **então** vejo o cartão com a capa, o nome e "0 cenários".
- [ ] **Dado** que criei uma campanha sem capa, **quando** olho o cartão, **então** vejo a capa gerada com as iniciais "MC".
- [ ] **Dado** que tenho duas campanhas, **quando** abro a mais antiga e volto ao Início, **então** ela passa a ser o primeiro cartão.
- [ ] **Dado** que escolhi **Excluir**, **quando** digito um nome diferente do da campanha, **então** o botão de confirmar continua desabilitado.
- [ ] **Dado** que excluí uma campanha, **quando** abro a pasta `Somillo/lixeira`, **então** a pasta da campanha está lá.
- [ ] **Dado** que fechei o app, **quando** abro de novo, **então** vejo as mesmas campanhas, na mesma ordem.

## Fora do escopo

- Restaurar campanhas da lixeira pelo app (Etapa 12; até lá, basta mover a pasta de volta).
- Exportar e importar campanha (Etapa 12).
- Campanhas na nuvem ou compartilhadas entre mestres.

## Dúvidas em aberto

> ❓ **Dúvida:** os cartões devem mostrar a data da última sessão jogada (ex.: "última sessão: 01/11")? Isso só faz sentido a partir da Etapa 2.

> ❓ **Dúvida:** vale ter um campo "sistema de jogo" na campanha (ex.: D&D 5e), pensando em campanhas futuras de outros sistemas?
