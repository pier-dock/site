import { cacheLife, cacheTag } from "next/cache";
import { fallbackVersion, githubRepo } from "./site";

/** `https://github.com/o/r/releases/tag/v0.4.0` → `0.4.0`. */
export function versionFromTagUrl(url: string | null) {
  const tag = url?.match(/\/releases\/tag\/([^/?#]+)$/)?.[1];
  return tag ? decodeURIComponent(tag).replace(/^v/, "") : null;
}

/**
 * Versão da última release publicada no GitHub. Lê o redirect de /releases/latest em vez da API
 * REST, que sem token limita a 60 requisições por hora por IP (e na Vercel o IP é compartilhado).
 */
export async function getLatestVersion() {
  "use cache";
  cacheTag("release");
  try {
    const res = await fetch(`https://github.com/${githubRepo}/releases/latest`, {
      method: "HEAD",
      redirect: "manual",
    });
    const latest = versionFromTagUrl(res.headers.get("location"));
    if (latest) {
      cacheLife("hours");
      return latest;
    }
  } catch {}
  // Falhou: usa a versão do env, mas tenta de novo logo em vez de segurar o valor por uma hora.
  cacheLife("minutes");
  return fallbackVersion;
}
