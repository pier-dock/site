"use client";

import { useCallback, useEffect, useRef } from "react";

function noiseBuffer(ctx: AudioContext) {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.05), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function envelope(ctx: AudioContext, peak: number, attack: number, decay: number) {
  const t = ctx.currentTime;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(peak, t + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  gain.connect(ctx.destination);
  return gain;
}

function tone(
  ctx: AudioContext,
  type: OscillatorType,
  [from, to, glide]: [number, number, number],
  peak: number,
  decay: number,
) {
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  osc.frequency.exponentialRampToValueAtTime(to, t + glide);
  osc.connect(envelope(ctx, peak, 0.0015, decay));
  osc.start(t);
  osc.stop(t + decay + 0.02);
}

const jitter = (x: number, amount: number) => x * (1 - amount + Math.random() * 2 * amount);

// Os níveis abaixo somam um pico de ~0,14; este ganho deixa o pico em ~0,06 no volume padrão
// da dock (60): um som de fundo, bem suave.
const loudness = 0.7;

/**
 * Toque de vidro com corpo: um "tique" agudo que cai de tom (seno e um harmônico triangular),
 * um estalo curtíssimo de ruído só nos agudos e, por baixo, um "toc" grave que dá peso à tecla.
 * Tom e volume variam um pouco a cada toque, para a sequência da intro não soar robótica.
 */
function keypress(ctx: AudioContext, noise: AudioBuffer, volume: number) {
  const t = ctx.currentTime;
  const v = volume * loudness * jitter(1, 0.15);
  const f = jitter(1600, 0.04);

  tone(ctx, "sine", [f, f * 0.75, 0.015], 0.08 * v, 0.035);
  tone(ctx, "triangle", [f * 2, f * 1.5, 0.015], 0.015 * v, 0.02);
  tone(ctx, "sine", [jitter(420, 0.05), 260, 0.03], 0.06 * v, 0.05);

  const click = ctx.createBufferSource();
  click.buffer = noise;
  const high = ctx.createBiquadFilter();
  high.type = "highpass";
  high.frequency.value = 7000;
  high.Q.value = 0.7;
  click.connect(high).connect(envelope(ctx, 0.02 * v, 0.001, 0.004));
  click.start(t);
  click.stop(t + 0.05);
}

/**
 * Som de tecla para a dock: toca no pico do "hover" de cada item na intro e, depois, quando o
 * mouse passa por qualquer item. O navegador só libera áudio depois de um clique ou toque na
 * página, então na primeira visita a intro costuma ficar muda; o primeiro gesto destrava o
 * hover. O volume segue o controle de volume da própria dock (0 a 100).
 */
export function useDockSound(volume: number) {
  const audio = useRef<{ ctx: AudioContext; noise: AudioBuffer } | null>(null);
  const level = useRef(volume / 100);

  useEffect(() => {
    level.current = volume / 100;
  }, [volume]);

  const play = useCallback(() => {
    const a = audio.current;
    if (a?.ctx.state === "running" && level.current > 0) keypress(a.ctx, a.noise, level.current);
  }, []);

  useEffect(() => {
    const ctx = new AudioContext();
    audio.current = { ctx, noise: noiseBuffer(ctx) };
    ctx.resume().catch(() => {});
    const unlock = () => void ctx.resume().catch(() => {});
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);

    // A intro é CSS: lê o atraso de cada animação para tocar no pico (40%) dela. Com
    // prefers-reduced-motion não há animação e nada é agendado.
    const timers: number[] = [];
    document.querySelectorAll<HTMLElement>("[data-intro-item]").forEach((el) => {
      const anim = el
        .getAnimations()
        .find((a) => a instanceof CSSAnimation && a.animationName === "intro-hover");
      const timing = anim?.effect?.getComputedTiming();
      if (!timing) return;
      const at =
        Number(timing.delay) + 0.4 * Number(timing.duration) - Number(timing.localTime ?? 0);
      if (at >= 0) timers.push(window.setTimeout(play, at));
    });

    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
      audio.current = null;
      void ctx.close();
    };
  }, [play]);

  return play;
}
