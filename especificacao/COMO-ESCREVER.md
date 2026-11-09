# Como escrever a especificação do Somillo

Este guia explica como escrever, por conta própria, as telas e funcionalidades do Somillo num formato que:

1. você lê e edita com facilidade;
2. o GitHub mostra formatado;
3. o Claude entende sem ambiguidade na hora de programar;
4. vira PDF com um comando.

## 1. O formato escolhido: Markdown com cabeçalho

Cada tela e cada funcionalidade é um arquivo **Markdown** (`.md`) com um pequeno **cabeçalho** no topo. Por que esse formato:

- **É texto puro.** Abre em qualquer editor, nunca "corrompe", e o Git mostra exatamente o que mudou entre uma versão e outra.
- **O GitHub mostra formatado:** títulos, tabelas, caixinhas de seleção, imagens.
- **O Claude lê Markdown com perfeição.** Tabelas e listas deixam pouca margem para interpretação.
- **Vira PDF** com o script do repositório (seção 10).

Alternativas descartadas: Word e Google Docs (difícil ver o que mudou, fica fora do repositório), Notion (fora do repositório), YAML ou JSON puro (chato de escrever à mão).

**Onde editar:**

- **VS Code** (recomendado, grátis): abra a pasta `somillo`; `Ctrl+Shift+V` (`Cmd+Shift+V` no Mac) mostra a prévia formatada. Ao abrir a pasta, o VS Code sugere duas extensões úteis: *Markdown All in One* e *Markdown Preview Mermaid Support*.
- **Obsidian** (grátis): abra a pasta `especificacao` como um "cofre"; tem prévia ao vivo.
- **GitHub no navegador:** abra o arquivo e clique no lápis. Bom para ajustes rápidos; para salvar, clique em **Commit changes**.

## 2. Markdown em 2 minutos

~~~markdown
# Título da página (só um por arquivo)
## Seção
### Subseção

Texto normal. **Negrito**, *itálico* e `nome de botão ou código`.

- item de lista
  - subitem (dois espaços antes do hífen)
1. item numerado

- [ ] caixinha (usada nos critérios de aceite)

| Coluna A | Coluna B |
|---|---|
| célula   | célula   |

> Bloco de destaque (usado para dúvidas)

![Esboço da Mesa](../imagens/T-03-mesa.png)
[Link para outra tela](T-01-inicio.md)
~~~

Para um desenho em texto (esboço), escreva entre duas linhas com três crases, sendo a primeira ` ```text `. Veja o esboço da T-01 como exemplo.

## 3. Tela ou funcionalidade?

- **Tela (`T-xx`)**: um lugar onde a pessoa "está", com visual próprio. Ex.: Início, Campanha, Mesa, Ficha, Configurações.
- **Funcionalidade (`F-xx`)**: um comportamento ou conjunto de regras que aparece em várias telas, ou que tem regras demais para caber numa tela só. Ex.: Rolagem de dados, Névoa de guerra, Permissões dos tokens, Iniciativa.

Teste rápido: dá para tirar um print? É **tela**. É um conjunto de regras? É **funcionalidade**. Na dúvida, escreva como tela; dá para separar depois.

Janelas pequenas, como "Nova campanha", ficam dentro do arquivo da tela que as abre e não precisam de arquivo próprio.

## 4. Passo a passo para criar um arquivo

1. Veja na seção 8 da `ESPECIFICACAO.md` se a tela já tem um ID. Se não tiver, use o próximo livre (T-08, F-02…).
2. Copie o modelo:
   - tela: `modelos/modelo-tela.md` → `telas/T-03-mesa.md`;
   - funcionalidade: `modelos/modelo-funcionalidade.md` → `funcionalidades/F-02-nevoa-de-guerra.md`.
3. Nome do arquivo: `ID-nome-curto.md`, em minúsculas, sem acentos, com hífens entre as palavras.
4. Preencha o cabeçalho (seção 5).
5. Preencha as seções (seção 6). No rascunho pode deixar seções em branco, mas não apague os títulos. Os comentários `<!-- … -->` do modelo são dicas: não aparecem na prévia nem no PDF e podem ser apagados.
6. Rascunho terminado? Peça uma revisão ao Claude. Tudo certo? Mude para `status: pronto`.
7. Se a tela ou funcionalidade é nova, inclua-a na tabela da seção 8 da especificação (ou peça ao Claude).

Arquivos cujo nome começa com `_` (ex.: `_anotacoes.md`) não entram no PDF: use para rascunhos soltos.

## 5. O cabeçalho

Fica no topo do arquivo, entre duas linhas `---`:

```yaml
---
id: T-03                      # ID único; igual ao começo do nome do arquivo
titulo: Mesa                  # nome da tela ou funcionalidade
tipo: tela                    # tela | funcionalidade
etapa: 3                      # etapa em que nasce (seção 9 da especificação)
status: rascunho              # rascunho | pronto | implementado | testado
quem-ve: [mestre, jogador]    # só em telas
telas: [T-03, T-06]           # só em funcionalidades: onde ela aparece
atualizado: 2026-11-08        # data da última mudança (AAAA-MM-DD)
---
```

O ciclo do `status`:

| status | Significa | Quem muda |
|---|---|---|
| `rascunho` | ainda em escrita; o Claude não implementa | você |
| `pronto` | você terminou e aprovou; pode ser implementado | você |
| `implementado` | o código existe e passou nos testes automáticos | Claude |
| `testado` | o grupo testou de verdade, na versão instalada | você |

## 6. Como escrever cada seção

### Objetivo

De 1 a 3 frases: para que a tela existe.

- ✅ "Mostra as campanhas que eu mestro e é a porta de entrada para a mesa de outra pessoa."
- ❌ "Tela inicial do app." (não diz para que serve)

### Quem usa e Como se chega aqui

Quem vê a tela e por quais caminhos chega até ela (botões, atalhos, situações).

### O que a tela mostra

Descreva de cima para baixo e da esquerda para a direita. Numere os elementos para poder citá-los. Para cada um, diga **o que mostra** e, se não for óbvio, **de onde vem** a informação e **em que ordem**.

- ✅ "Cartões de campanha: capa, nome, número de cenários e 'aberta há 3 dias'. A mais recente primeiro."
- ❌ "Lista das campanhas." (que informação? em que ordem?)

### O que dá para fazer

Uma linha por ação: o que a pessoa faz → o que acontece. Inclua clique direito, arrastar e atalhos de teclado, e diga o que vem depois: para onde vai, o que é salvo.

- ✅ "**Excluir** → pede para digitar o nome; confirmado, a campanha vai para a lixeira."
- ❌ "Dá para excluir." (com confirmação? apaga de vez?)

### Estados especiais

O que aparece quando a tela está vazia, carregando, quando dá erro, quando falta permissão, quando a conexão cai. São os casos mais esquecidos e os que mais geram bugs.

### Regras

Limites (tamanho de nome, de arquivo), campos obrigatórios, o que acontece com nomes repetidos, o que é salvo e quando.

### Diferenças entre mestre e jogador

O que muda para cada papel. Se nada muda, escreva "Nenhuma".

### Esboço

Um desenho poupa muitas palavras. Três jeitos:

1. desenho em texto, num bloco ` ```text ` (veja a T-01);
2. foto de um rascunho no papel;
3. desenho no Excalidraw (excalidraw.com, grátis), Figma, Paint…

Imagens vão em `especificacao/imagens/`, com o ID no nome (`T-03-mesa.png`), e entram no arquivo assim: `![Esboço da Mesa](../imagens/T-03-mesa.png)`. Não precisa ser bonito: precisa mostrar o que fica onde.

### Critérios de aceite

A seção mais importante. Cada critério é um teste que alguém consegue conferir com "passou" ou "não passou". Formato:

**Dado** [situação inicial], **quando** [ação], **então** [resultado que dá para ver].

- ✅ "**Dado** que não existe campanha, **quando** abro o app, **então** vejo o botão **Criar minha primeira campanha**."
- ❌ "A tela deve ser intuitiva." (não dá para testar)

Dicas: um comportamento por critério; inclua pelo menos um caso de erro; use números concretos ("até 80 caracteres") em vez de vagos ("nome curto").

### Fora do escopo

O que **não** é para fazer agora. Evita que o Claude construa além do pedido e deixa claro o que fica para depois.

### Dúvidas em aberto

Escreva assim:

> ❓ **Dúvida:** os cartões mostram a data da última sessão?

O Claude responde logo abaixo, assim:

> 💬 **Claude:** sugiro mostrar só a partir da Etapa 2, porque…

Quando decidir, transforme a resposta numa regra (na seção certa) e apague a dúvida.

## 7. Palavras que importam

| Palavra | Significa |
|---|---|
| **deve** | obrigatório |
| **pode** | opcional, permitido |
| **não deve** | proibido |
| **[Etapa N]** | só entra na etapa N |
| **(proposta)** | sugestão ainda não decidida |

- Escreva o nome exato dos botões em negrito: **Abrir sessão**, e não "o botão de abrir".
- Use os termos do Glossário (seção 2 da especificação): sempre "cenário", e não ora "mapa", ora "cena".

## 8. Checklist antes de marcar `pronto`

- [ ] O objetivo está claro em até 3 frases.
- [ ] Todo elemento visível está descrito.
- [ ] Toda ação tem um resultado.
- [ ] Os estados vazio e de erro foram pensados.
- [ ] As diferenças entre mestre e jogador estão escritas.
- [ ] Há pelo menos 5 critérios de aceite, incluindo um de erro.
- [ ] "Fora do escopo" está preenchido.
- [ ] Nenhuma dúvida ficou sem resposta.
- [ ] O que é de etapas futuras está marcado com [Etapa N].

## 9. Como pedir ajuda ao Claude

Frases que funcionam bem:

- "Revise a T-03 e aponte o que está faltando."
- "Escreva um rascunho da T-04 a partir do roteiro da Etapa 2."
- "Transforme estas anotações soltas na T-05: …"
- "A Etapa 1 está pronta para começar? Confira o Definition of Ready."
- "Gere o PDF da especificação de novo."
- "Pode começar a Etapa 1." (só quando tudo dela estiver `pronto`)

## 10. Como gerar o PDF

É preciso ter o **Node.js** (versão LTS, em nodejs.org) e o **Microsoft Edge** ou o **Google Chrome** instalados; o script usa o navegador para "imprimir" o PDF. Na pasta do projeto, rode:

```bash
npm --prefix ferramentas/gerar-pdf install
npm --prefix ferramentas/gerar-pdf run pdf
```

O primeiro comando só é necessário na primeira vez. O PDF sai em `especificacao/Especificacao-Somillo.pdf` e reúne a especificação, todas as telas, todas as funcionalidades e este guia. Ou simplesmente peça ao Claude: "gere o PDF de novo".
