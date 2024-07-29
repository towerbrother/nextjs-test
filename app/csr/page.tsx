"use client";
// Client-Side Rendering (CSR)
// Use the PokeAPI (https://pokeapi.co) to fetch Pokemon data by name.
// create an API endpoint to fetch Pokemon data by name there.

import { Suspense } from "react";
import Pokemon from "./pokemon";

export default function PokemonPage() {
  return (
    <Suspense fallback={<p>Fetching pokemon...</p>}>
      <Pokemon />
    </Suspense>
  );
}
