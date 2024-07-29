"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [pokemonName, setPokemonName] = useState("");
  const [category, setCategory] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [id, setId] = useState("");

  return (
    <main className="flex justify-center items-center min-h-dvh">
      <div className="grid gap-y-2">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <input
            type="text"
            placeholder="Pokemon name"
            onChange={(e) => setPokemonName(e.target.value)}
            value={pokemonName}
            className="p-3 border border-black"
          />

          <Link
            href={`/csr?name=${pokemonName.toLowerCase()}`}
            className="border border-black p-3 hover:bg-gray-50 transition"
          >
            Go to CSR
          </Link>

          <input
            type="text"
            placeholder="News category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="p-3 border border-black"
          />

          <Link
            href={`/isr/${category}`}
            className="border border-black p-3 hover:bg-gray-50 transition"
          >
            Go to ISR
          </Link>

          <input
            type="text"
            placeholder="Character ID"
            onChange={(e) => setCharacterId(e.target.value)}
            value={characterId}
            className="p-3 border border-black"
          />

          <Link
            href={`/ssr/${characterId}`}
            className="border border-black p-3 hover:bg-gray-50 transition"
          >
            Go to SSR
          </Link>

          <input
            type="text"
            placeholder="Post ID"
            onChange={(e) => setId(e.target.value)}
            value={id}
            className="p-3 border border-black"
          />
          <Link
            href={`/ssg/${id}`}
            className="border border-black p-3 hover:bg-gray-50 transition"
          >
            Go to SSG
          </Link>
        </div>
      </div>
    </main>
  );
}
