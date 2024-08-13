"use client";
import dynamic from "next/dynamic";
// Client-Side Rendering (CSR)
// Use the PokeAPI (https://pokeapi.co) to fetch Pokemon data by name.
// create an API endpoint to fetch Pokemon data by name there.

import { Suspense } from "react";

const Pokemon = dynamic(() => import("./pokemon"), { ssr: false });

export default function PokemonPage() {
  return (
    <Suspense fallback={<p>Fetching pokemon...</p>}>
      <Pokemon />
    </Suspense>
  );
}
