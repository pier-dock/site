import type { StaticImageData } from "next/image";
import charizard from "@/assets/pokemon/6.png";
import gengar from "@/assets/pokemon/94.png";
import gligar from "@/assets/pokemon/207.png";
import sneasel from "@/assets/pokemon/215.png";
import mamoswine from "@/assets/pokemon/473.png";
import krookodile from "@/assets/pokemon/553.png";

export type BuddyPokemon = { id: number; sprite: StaticImageData };

/** Ícones gen VII do PokeAPI (40x30), os mesmos que a dock usa no widget de Pokémon. */
export const buddyPokemon: BuddyPokemon[] = [
  { id: 6, sprite: charizard },
  { id: 94, sprite: gengar },
  { id: 207, sprite: gligar },
  { id: 215, sprite: sneasel },
  { id: 473, sprite: mamoswine },
  { id: 553, sprite: krookodile },
];
