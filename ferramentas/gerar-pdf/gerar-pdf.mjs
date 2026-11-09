#!/usr/bin/env node
// Gera especificacao/Especificacao-Somillo.pdf a partir dos arquivos Markdown da especificação.
//
// Uso (na raiz do repositório):
//   npm --prefix ferramentas/gerar-pdf install   (só na primeira vez)
//   npm --prefix ferramentas/gerar-pdf run pdf
//
// Precisa de Microsoft Edge, Google Chrome ou Chromium instalado. Para indicar outro navegador,
// defina a variável de ambiente NAVEGADOR com o caminho do executável.

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import { Marked } from 'marked';
import puppeteer from 'puppeteer-core';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..', '..');
const ESPEC = path.join(RAIZ, 'especificacao');
const SAIDA = path.join(ESPEC, 'Especificacao-Somillo.pdf');
const TMP = path.join(AQUI, '.tmp');
const MERMAID = path.join(AQUI, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js');

// ---------------------------------------------------------------- utilidades

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const semTags = (html) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');

const idsUsados = new Map();
function slug(texto) {
  const base =
    texto
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'secao';
  const n = idsUsados.get(base) ?? 0;
  idsUsados.set(base, n + 1);
  return n === 0 ? base : `${base}-${n + 1}`;
}

const dataBR = (valor) => {
  if (!valor) return '';
  const d = valor instanceof Date ? valor : new Date(`${valor}T12:00:00`);
  return Number.isNaN(d.getTime()) ? String(valor) : d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

async function listarMd(dir) {
  if (!existsSync(dir)) return [];
  return (await readdir(dir))
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }))
    .map((f) => path.join(dir, f));
}

function acharNavegador() {
  const doAmbiente = process.env.NAVEGADOR || process.env.CHROME_PATH;
  if (doAmbiente && existsSync(doAmbiente)) return doAmbiente;
  const e = process.env;
  const candidatos =
    {
      win32: [
        `${e['PROGRAMFILES(X86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
        `${e.PROGRAMFILES}\\Microsoft\\Edge\\Application\\msedge.exe`,
        `${e.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
        `${e['PROGRAMFILES(X86)']}\\Google\\Chrome\\Application\\chrome.exe`,
        `${e.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
      ],
      darwin: [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
      ],
      linux: [
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser',
        '/usr/bin/microsoft-edge',
        '/snap/bin/chromium',
      ],
    }[process.platform] ?? [];
  return candidatos.find((c) => c && existsSync(c));
}

// ---------------------------------------------------------------- documentos

const principal = path.join(ESPEC, 'ESPECIFICACAO.md');
const partes = [
  { titulo: 'Parte I — Especificação', arquivos: [principal], unico: true, classe: 'doc-principal' },
  { titulo: 'Parte II — Telas', arquivos: await listarMd(path.join(ESPEC, 'telas')) },
  { titulo: 'Parte III — Funcionalidades', arquivos: await listarMd(path.join(ESPEC, 'funcionalidades')) },
  { titulo: 'Anexo — Como escrever a especificação', arquivos: [path.join(ESPEC, 'COMO-ESCREVER.md')], unico: true },
].filter((p) => p.arquivos.length > 0);

const ancoraDoArquivo = (arquivo) => `doc-${slug(path.basename(arquivo, '.md'))}`;
const ancoras = new Map();
for (const parte of partes) for (const arq of parte.arquivos) ancoras.set(path.resolve(arq), ancoraDoArquivo(arq));

// ---------------------------------------------------------------- markdown → html

let docAtual = { dir: ESPEC, rebaixar: 0, removerH1: false, h1Removido: false };
const titulos = []; // { nivel, texto, id }

const marked = new Marked({
  gfm: true,
  walkTokens(token) {
    if (token.type === 'heading') token.depth = Math.min(6, token.depth + docAtual.rebaixar);
    if (token.type === 'link' && token.href && !/^[a-z]+:|^#/i.test(token.href)) {
      const [alvo, frag] = token.href.split('#');
      const absoluto = path.resolve(docAtual.dir, decodeURI(alvo));
      if (ancoras.has(absoluto)) token.href = `#${frag ? frag : ancoras.get(absoluto)}`;
      else token.href = pathToFileURL(absoluto).href + (frag ? `#${frag}` : '');
    }
    if (token.type === 'image' && token.href && !/^[a-z]+:/i.test(token.href)) {
      token.href = pathToFileURL(path.resolve(docAtual.dir, decodeURI(token.href))).href;
    }
  },
  renderer: {
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      const texto = semTags(html).trim();
      const id = slug(texto);
      titulos.push({ nivel: depth, texto, id });
      return `<h${depth} id="${id}">${html}</h${depth}>\n`;
    },
    code({ text, lang }) {
      if (lang === 'mermaid') return `<pre class="mermaid">${esc(text)}</pre>\n`;
      return `<pre><code class="lang-${esc(lang || 'texto')}">${esc(text)}</code></pre>\n`;
    },
  },
});

function caixaDeMetadados(dados) {
  if (!dados.id) return '';
  const itens = [];
  itens.push(`<span><b>ID</b> ${esc(dados.id)}</span>`);
  if (dados.tipo) itens.push(`<span><b>Tipo</b> ${esc(dados.tipo)}</span>`);
  if (dados.etapa !== undefined) itens.push(`<span><b>Etapa</b> ${esc(dados.etapa)}</span>`);
  if (dados['quem-ve']) itens.push(`<span><b>Quem vê</b> ${esc([].concat(dados['quem-ve']).join(', '))}</span>`);
  if (dados.telas) itens.push(`<span><b>Telas</b> ${esc([].concat(dados.telas).join(', '))}</span>`);
  if (dados.atualizado) itens.push(`<span><b>Atualizado</b> ${esc(dataBR(dados.atualizado))}</span>`);
  const status = String(dados.status ?? 'rascunho');
  itens.push(`<span class="status status-${esc(slugSimples(status))}">${esc(status)}</span>`);
  return `<div class="meta">${itens.join('')}</div>`;
}
const slugSimples = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

async function renderizarArquivo(arquivo, parte) {
  const bruto = await readFile(arquivo, 'utf8');
  const { data, content } = matter(bruto);
  let texto = content;
  if (parte.unico) texto = texto.replace(/^\s*#\s+.*$/m, ''); // o título da parte substitui o H1 do arquivo
  docAtual = { dir: path.dirname(arquivo), rebaixar: parte.unico ? 0 : 1 };
  let html = marked.parse(texto);
  if (!parte.unico) html = html.replace(/(<\/h2>\n)/, `$1${caixaDeMetadados(data)}\n`);
  const classe = ['doc', parte.classe].filter(Boolean).join(' ');
  return { html: `<section class="${classe}" id="${ancoras.get(path.resolve(arquivo))}">\n${html}</section>`, data };
}

// ---------------------------------------------------------------- montagem

const { data: metaPrincipal } = matter(await readFile(principal, 'utf8'));
const [nome, complemento] = String(metaPrincipal.titulo ?? 'Somillo — Mesa de RPG').split(/\s+—\s+/);

let corpo = '';
for (const parte of partes) {
  const id = slug(parte.titulo);
  titulos.push({ nivel: 1, texto: parte.titulo, id });
  corpo += `<h1 id="${id}">${esc(parte.titulo)}</h1>\n`;
  for (const arquivo of parte.arquivos) corpo += (await renderizarArquivo(arquivo, parte)).html + '\n';
}

const entradasSumario = titulos.filter((t) => t.nivel <= 2 || (t.nivel === 3 && /^Etapa \d/.test(t.texto)));
const sumario = `<section class="sumario"><h1 class="titulo-sumario">Sumário</h1><ul>${entradasSumario
  .map((t) => `<li class="n${t.nivel}"><a href="#${t.id}">${esc(t.texto)}</a></li>`)
  .join('')}</ul></section>`;

const hoje = new Date().toLocaleDateString('pt-BR');
const capa = `<section class="capa">
  <div class="capa-topo">Especificação do produto</div>
  <div class="capa-meio">
    <div class="capa-nome">${esc(nome)}</div>
    <div class="capa-complemento">${esc(complemento ?? 'Mesa de RPG')} <span>· RPG Table</span></div>
    <div class="capa-linha"></div>
    <div class="capa-campanha">Campanha de estreia: <b>Maldição Cavérica</b> · D&amp;D 5e</div>
  </div>
  <div class="capa-rodape">
    <div><b>Versão</b> ${esc(metaPrincipal.versao ?? '')}</div>
    <div><b>Situação</b> ${esc(metaPrincipal.status ?? '')}</div>
    <div><b>Data</b> ${esc(dataBR(metaPrincipal.data))}</div>
    <div><b>PDF gerado em</b> ${esc(hoje)}</div>
  </div>
</section>`;

const css = await readFile(path.join(AQUI, 'estilo.css'), 'utf8');
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>${esc(metaPrincipal.titulo ?? 'Somillo')} — Especificação</title>
<style>${css}</style></head>
<body>${capa}${sumario}${corpo}</body></html>`;

await mkdir(TMP, { recursive: true });
const arquivoHtml = path.join(TMP, 'especificacao.html');
await writeFile(arquivoHtml, html, 'utf8');

// ---------------------------------------------------------------- html → pdf

const navegador = acharNavegador();
if (!navegador) {
  console.error('Não encontrei o Edge, o Chrome nem o Chromium. Instale um deles ou defina NAVEGADOR=<caminho do executável>.');
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath: navegador, headless: true, args: ['--allow-file-access-from-files'] });
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(arquivoHtml).href, { waitUntil: 'load', timeout: 120_000 });
  if (await page.$('pre.mermaid')) {
    await page.addScriptTag({ path: MERMAID });
    await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
        themeVariables: {
          primaryColor: '#fef3c7',
          primaryBorderColor: '#b45309',
          primaryTextColor: '#1c1917',
          lineColor: '#78716c',
          secondaryColor: '#f5f5f4',
          tertiaryColor: '#fafaf9',
          clusterBkg: '#fafaf9',
          clusterBorder: '#d6d3d1',
          fontSize: '13px',
        },
      });
      // eslint-disable-next-line no-undef
      await mermaid.run({ querySelector: 'pre.mermaid' });
    });
  }
  await page.evaluate(() => document.fonts.ready);
  const rodape = `<div style="width:100%;font-family:'Segoe UI',Arial,sans-serif;font-size:7.5px;color:#78716c;padding:0 16mm;display:flex;justify-content:space-between;">
    <span>Somillo — Especificação v${esc(metaPrincipal.versao ?? '')}</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;
  await page.pdf({
    path: SAIDA,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: rodape,
    margin: { top: '16mm', bottom: '18mm', left: '16mm', right: '16mm' },
    outline: true,
    tagged: true,
    timeout: 180_000,
  });
} finally {
  await browser.close();
}

console.log(`PDF gerado: ${path.relative(RAIZ, SAIDA)}`);
