"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { type BuddyPokemon, buddyPokemon } from "@/lib/pokemon";
import { Walker } from "./Clawd";

let picked: BuddyPokemon | null = null;

function pick(): BuddyPokemon {
  picked ??= buddyPokemon[Math.floor(Math.random() * buddyPokemon.length)]!;
  return picked;
}

const subscribe = () => () => {};
const serverPick = () => null;

// O sorteio é do visitante: o HTML estático sai sem Pokémon e o navegador escolhe na hidratação,
// uma vez por carregamento da página (o mesmo Pokémon vale para os passeios e para o tile).
function useBuddyPokemon() {
  return useSyncExternalStore(subscribe, pick, serverPick);
}

const iconRatio = 30 / 40;
// Os pés do ícone terminam 2px (de 40) acima da borda de baixo da imagem.
const feetGap = 2 / 40;

type PokemonWalkerProps = {
  /** Largura do ícone, que também é a da caixa que anda. */
  size: number;
  /** Ver `Walker`. */
  className?: string;
};

// Os ícones olham para a esquerda e o passeio começa indo para a direita: o espelho no sprite, somado
// ao do `Walker` nas pontas, mantém o Pokémon virado para o lado em que ele anda.
export function PokemonWalker({ size, className }: PokemonWalkerProps) {
  const pokemon = useBuddyPokemon();
  if (!pokemon) return null;

  const height = size * iconRatio;
  const overlap = (size - height) / 2 + size * feetGap;
  return (
    <Walker size={size} overlap={overlap} className={className}>
      <Image
        src={pokemon.sprite}
        alt=""
        width={size}
        height={height}
        unoptimized
        className="[scale:-1_1] clawd-wobble [image-rendering:pixelated]"
      />
    </Walker>
  );
}

export function PokemonTile() {
  const pokemon = useBuddyPokemon();

  return (
    <span className="relative flex size-10 items-center justify-center rounded-[10px] bg-white/6 sm:size-11">
      {pokemon && (
        <Image
          src={pokemon.sprite}
          alt=""
          width={36}
          height={36 * iconRatio}
          unoptimized
          className="w-9 [image-rendering:pixelated]"
        />
      )}
    </span>
  );
}
