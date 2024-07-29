"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const searchParams = useSearchParams();
  const query = searchParams.get("name");

  useEffect(() => {
    // using this flag to protect against race condition
    let isActive = true;

    const fetchPokemon = async () => {
      try {
        if (!query) {
          throw new Error("No valid Pokemon query provided");
        }

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${query}`
        );

        if (response.ok) {
          const data = (await response.json()) as Pokemon;

          if (isActive) {
            setPokemon({
              name: data.name,
              sprites: {
                front_default: data.sprites["front_default"],
              },
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();

    // cleaning up flag
    return () => {
      isActive = false;
    };
  }, [query]);

  if (!pokemon) {
    return null;
  }

  // applied only minimal styling
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold mt-12">
        {pokemon.name.toUpperCase()}
      </h1>
      <Image
        src={pokemon.sprites.front_default}
        alt={`${pokemon.name} front default sprite`}
        height={300}
        width={300}
      />
    </div>
  );
}
