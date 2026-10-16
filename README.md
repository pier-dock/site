# Site do Pier

Landing page do [Pier](https://github.com/pier-dock/pier-dock), a dock para macOS, Windows e Linux. Feita com Next.js 16 (App Router), TypeScript strict e Tailwind CSS v4. Todas as rotas são geradas no build (SSG); só a detecção do sistema operacional acontece no navegador.

## Como rodar

Você precisa do Node.js 20.9 ou mais recente e do pnpm (`corepack enable pnpm`).

```sh
pnpm install
pnpm dev          # http://localhost:3000
```

| Comando          | O que faz                                                       |
| ---------------- | --------------------------------------------------------------- |
| `pnpm dev`       | Servidor de desenvolvimento                                     |
| `pnpm build`     | Build de produção (falha se alguma rota deixar de ser estática) |
| `pnpm start`     | Serve o build de produção                                       |
| `pnpm lint`      | ESLint                                                          |
| `pnpm typecheck` | `tsc --noEmit`                                                  |
| `pnpm test`      | Testes unitários (Vitest)                                       |
| `pnpm format`    | Prettier                                                        |

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste. Todas são públicas (`NEXT_PUBLIC_*`) e entram no HTML durante o build, então mudar uma delas exige um novo deploy.

| Variável                  | Padrão                  | Uso                                                                    |
| ------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | `http://localhost:3000` | URL canônica: `metadataBase`, sitemap, robots, JSON-LD                 |
| `NEXT_PUBLIC_GITHUB_REPO` | `pier-dock/pier-dock`   | Repositório no formato `dono/repo`: links do GitHub e URLs de download |
| `NEXT_PUBLIC_VERSION`     | `0.2.0`                 | Versão exibida no JSON-LD e usada nos nomes dos arquivos de download   |

Na Vercel, defina as três em **Settings > Environment Variables** para Production (e Preview, se quiser os links certos nos previews).

## Como trocar as URLs de download

Os downloads ficam todos em [`lib/downloads.ts`](lib/downloads.ts). Cada sistema tem rótulo, texto do botão, arquivo, requisitos, alternativas e URL.

As URLs apontam para a última release do GitHub:

```
https://github.com/<NEXT_PUBLIC_GITHUB_REPO>/releases/latest/download/<arquivo>
```

Os nomes dos arquivos seguem o padrão do `tauri-action` no repositório do app (`Pier_<versão>_universal.dmg`, `Pier_<versão>_x64-setup.exe`, `Pier_<versão>_amd64.AppImage` e `Pier_<versão>_amd64.deb`).

> [!IMPORTANT]
> `releases/latest/download/` só resolve se o arquivo existir na release marcada como _latest_. Quando publicar uma versão nova, atualize `NEXT_PUBLIC_VERSION` e faça um novo deploy. Releases em rascunho não contam como _latest_.

Para mudar um nome de arquivo, edite `buildDownloads()`. Os textos (botões e requisitos) ficam em `downloads` nos dicionários de `lib/i18n/`. Os testes em `tests/downloads.test.ts` conferem se todo sistema tem todos os campos.

## Estrutura

```
app/
  [lang]/
    layout.tsx          layout raiz por idioma: <html lang>, fontes, metadata e viewport
    page.tsx            a landing
    opengraph-image.tsx imagem OG por idioma, gerada com next/og (twitter-image reexporta)
  apple-icon.tsx  icon.svg  favicon.ico  manifest.ts  sitemap.ts  robots.ts
  globals.css           tokens do @theme, vidro, temas dos widgets e animações de rolagem
assets/apps/            ícones SVG dos apps da demo
components/             seções da página; DockDemo/ é a demo interativa
lib/
  i18n/                 en.ts (define o tipo Dictionary), pt-BR.ts e index.ts (idiomas, rotas, fill)
  os.ts                 detectPlatform(): função pura que recebe UA e client hints
  downloads.ts          dados de download por sistema
  widgets.ts            getWidgets(): widgets do carrossel com os textos do idioma
  seo.ts                metadata, hreflang, viewport e JSON-LD
  site.ts               variáveis de ambiente, autores e links
tests/                  Vitest
```

### Idiomas

O inglês é o idioma principal e fica em `/`. O português fica em `/pt-br`. As duas páginas são geradas no build por `app/[lang]` (`/en` e `/pt-br`). No `next.config.ts`, um _rewrite_ serve `/en` na raiz e um _redirect_ leva `/en` de volta para `/`, para não haver duas URLs com o mesmo conteúdo. O seletor EN | PT da navbar é um link comum (`components/Header.tsx`).

Todo texto vem de `lib/i18n/en.ts`, que define o tipo `Dictionary`. O `pt-BR.ts` precisa ter exatamente as mesmas chaves, e o TypeScript e o teste `tests/i18n.test.ts` acusam qualquer diferença. Textos com valores usam `{chave}` e `fill()`.

Para adicionar um idioma:

1. Crie `lib/i18n/<idioma>.ts` com o tipo `Dictionary`.
2. Adicione-o em `locales`, `localePath` e `localeInfo` (`lib/i18n/index.ts`).
3. Inclua o hreflang em `languages` (`lib/seo.ts`).

### Client Components

Só estes rodam no navegador: `OSProvider`, `HeroCta`, `DownloadPanel`, `CopyButton` e `DockDemo/*`. A demo da dock fica num chunk separado (`next/dynamic`). O HTML dela já vem pronto do build, com o relógio em `--:--` até a hidratação.

### Animações

As animações ao rolar usam CSS (`animation-timeline: view()`), sem JavaScript: os utilitários `reveal`, `reveal-step-N`, `reveal-x`, `stage-rise` e `drift` em `app/globals.css`. Em navegadores sem suporte e com `prefers-reduced-motion`, os elementos ficam no estado final, sem nada escondido.

### Intro

Ao abrir a página, a dock aparece logo abaixo do hero, o hero sai dela com um efeito gênio (como o do macOS) e a dock desce até o palco da demo. Três peças:

- **CSS:** as animações `intro-*` e `genie-slice` em `app/globals.css`. Elas usam só `transform` e `opacity`, então rodam no compositor e ficam fluidas mesmo durante a hidratação.
- **Fatias:** o hero é dividido em fatias horizontais (selo, linhas do título, subtítulo, botões). Cada uma recebe `genieSlice(n)` (`components/genie.ts`). As de cima saem antes, o que desenha a silhueta curva do gênio.
- **Medição:** o script inline `components/IntroScript.tsx` mede, antes da primeira pintura, de onde a dock sai e a distância de cada fatia até ela.

Sem JavaScript, a dock só aparece no lugar. Com `prefers-reduced-motion`, nada anima.

### Incluir um widget no carrossel

1. Adicione os textos em `widgets.items` nos dicionários (`lib/i18n/en.ts` e `pt-BR.ts`).
2. Adicione o widget em `getWidgets()` (`lib/widgets.ts`), com `id`, ícone e o tipo de `data`.
3. Crie o tema `widget-<id>` em `app/globals.css` (fundo, `border-color` e `--widget-halo`, o brilho do hover), com as cores como tokens no `@theme`.
4. Crie o visual em `components/widgets/` e registre-o no `switch` de `WidgetCard.tsx`.

### Tokens

Cores, sombras e raios ficam no `@theme` de `app/globals.css`. Não use hex nem `rgb()` direto nos componentes. As imagens geradas com `next/og` não leem CSS, então usam as cores espelhadas em `lib/brand.ts`.

## Deploy

Importe o repositório na Vercel (framework Next.js, sem configuração extra), defina as variáveis de ambiente e faça o deploy.
