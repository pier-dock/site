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

| Variável                  | Padrão                  | Uso                                                                                                 |
| ------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | `http://localhost:3000` | URL canônica: `metadataBase`, sitemap, robots, JSON-LD e o domínio do script de instalação do Linux |
| `NEXT_PUBLIC_GITHUB_REPO` | `pier-dock/pier-dock`   | Repositório no formato `dono/repo`: links do GitHub e URLs de download                              |
| `NEXT_PUBLIC_VERSION`     | `0.2.0`                 | Versão exibida no JSON-LD e usada nos nomes dos arquivos de download                                |

Na Vercel, defina as três em **Settings > Environment Variables** para Production (e Preview, se quiser os links certos nos previews).

## Como trocar as URLs de download

Os downloads ficam todos em [`lib/downloads.ts`](lib/downloads.ts). Cada sistema tem rótulo, texto do botão, arquivo, requisitos, comando de terminal, alternativas e URL.

As URLs apontam para a última release do GitHub:

```
https://github.com/<NEXT_PUBLIC_GITHUB_REPO>/releases/latest/download/<arquivo>
```

Os nomes dos arquivos seguem o padrão do `tauri-action` no repositório do app (`Pier_<versão>_universal.dmg`, `Pier_<versão>_x64-setup.exe`, `Pier_<versão>_amd64.AppImage` e `Pier_<versão>_amd64.deb`).

> [!IMPORTANT]
> `releases/latest/download/` só resolve se o arquivo existir na release marcada como _latest_. Quando publicar uma versão nova, atualize `NEXT_PUBLIC_VERSION` e faça um novo deploy. Releases em rascunho não contam como _latest_.

Para mudar um nome de arquivo, um requisito ou um comando, edite `buildDownloads()`. Os testes em `tests/downloads.test.ts` conferem se todo sistema tem todos os campos. Os comandos `brew`, `winget` e o `install.sh` ainda são placeholders: troque quando o Pier estiver publicado nesses canais.

## Estrutura

```
app/
  layout.tsx            layout raiz (pt-BR), fontes, metadata e viewport
  (site)/page.tsx       a landing
  opengraph-image.tsx   imagem OG gerada com next/og (twitter-image reexporta)
  apple-icon.tsx  icon.svg  favicon.ico  manifest.ts  sitemap.ts  robots.ts
  globals.css           tokens do @theme e utilitários de vidro e dos widgets
components/             seções da página; DockDemo/ é a demo interativa
lib/
  os.ts                 detectPlatform(): função pura que recebe UA e client hints
  downloads.ts          dados de download por sistema
  widgets.ts            lista tipada dos widgets do carrossel
  seo.ts                metadata, viewport e JSON-LD
  site.ts               variáveis de ambiente, autores e links
  i18n/pt-BR.ts         textos da página
tests/                  Vitest
```

### Client Components

Só estes rodam no navegador: `OSProvider`, `HeroCta`, `DownloadPanel`, `CopyButton` e `DockDemo/*`. A demo da dock fica num chunk separado (`next/dynamic`). O HTML dela já vem pronto do build, com o relógio em `--:--` até a hidratação.

### Incluir um widget no carrossel

1. Adicione um item em `widgets` (`lib/widgets.ts`) com `id`, textos, ícone e o tipo de `data`.
2. Crie o utilitário de fundo `widget-<id>` em `app/globals.css`, com as cores como tokens no `@theme`.
3. Crie o visual em `components/widgets/` e registre-o no `switch` de `WidgetCard.tsx`.

### Tokens

Cores, sombras e raios ficam no `@theme` de `app/globals.css`. Não use hex nem `rgb()` direto nos componentes. As imagens geradas com `next/og` não leem CSS, então usam as cores espelhadas em `lib/brand.ts`.

### Idiomas

O site está em pt-BR. Para adicionar inglês, crie `lib/i18n/en.ts` com o tipo `Dictionary`, a rota `/en` e a entrada `en: "/en"` em `languages` (`lib/seo.ts`). Daí o `hreflang` e o sitemap passam a listar a versão em inglês. Para o `<html lang>` variar por idioma, mova a página para `app/[lang]/` com `generateStaticParams`.

## Deploy

Importe o repositório na Vercel (framework Next.js, sem configuração extra), defina as variáveis de ambiente e faça o deploy.
