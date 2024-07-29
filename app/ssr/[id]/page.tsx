// Server-Side Rendering (SSR)
// Use SWAPI (https://swapi.dev) to fetch character data by ID.

import { notFound } from "next/navigation";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface PageProps {
  params?: { id: string | undefined };
}

async function fetchCharacter(id: string): Promise<Character | undefined> {
  try {
    // we won't cache data and re-fetch at every page reload
    const response = await fetch(`https://swapi.dev/api/people/${id}`, {
      cache: "no-store", // SSR - equivalent to the old getServerSideProps
    });

    // we are purposely not caching data at all, therefore we will be re-fetching at every page reload
    // note: you need to run `pnpm run build` + `pnpm run start` to see the difference between SSR and SSG
    console.log("Fetching characters");

    if (!response.ok) {
      throw new Error(
        `Something went wrong when fetching character with id ${id}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function CharacterPage({ params }: PageProps) {
  const id = params?.id;

  if (!id) {
    throw new Error("Please provide a valid character ID (i.e. 1, 2 etc.)");
  }

  const character = await fetchCharacter(id);

  if (!character) {
    notFound();
  }

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    gender,
    birth_year,
  } = character;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-12 mb-2">{name}</h1>
      <h2 className="text-xl">Gender: {gender}</h2>
      <h2 className="text-xl">DOB: {birth_year}</h2>
      <h2 className="text-xl">Height: {height}</h2>
      <h2 className="text-xl">Mass: {mass}</h2>
      <h2 className="text-xl">Hair Color: {hair_color}</h2>
      <h2 className="text-xl">Skin Color: {skin_color}</h2>
      <h2 className="text-xl">Eye Color: {eye_color}</h2>
    </div>
  );
}
