// Static Site Generation (SSG)
// Use https://jsonplaceholder.typicode.com API to fetch post data by ID.

import { notFound } from "next/navigation";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface PageProps {
  params?: { id: string | undefined };
}

// since the json placeholder API won't add any more posts
// we can add that to trigger a 404 in case the user enters an invalid ID
// normally though I would not do that in production but rather
// allow for incrementally static regeneration or you would need to build your app again
export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const posts = (await response.json()) as Post[];
  const ids = posts.map((post) => post.id.toString());

  return ids.map((id) => ({ id }));
}

async function fetchPost(id: string): Promise<Post | undefined> {
  try {
    // "force-cache" is the default option for caching when fetching on the server using next js fetch.
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    // we are caching data at build time, therefore we won't be re-fetching at every page reload
    // note: you need to run `pnpm run build` + `pnpm run start` to see the difference between SSR and SSG
    console.log("Fetching posts");

    if (!response.ok) {
      throw new Error(`Something went wrong while fetching post with id ${id}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function PostPage({ params }: PageProps) {
  const id = params?.id;

  if (!id) {
    throw new Error("Please provide a valid post ID (i.e. 1, 2 etc.)");
  }

  const post = await fetchPost(id);

  if (!post) {
    notFound();
  }

  const { userId, id: postId, body, title } = post;

  return (
    <div className="flex flex-col items-start m-6">
      <h1 className="text-3xl font-bold mt-12 mb-2">{title}</h1>
      <div className="flex">
        <h2 className="text-xl">ID: {postId}</h2>
        <h2 className="text-xl">User: {userId}</h2>
      </div>
      <p>{body}</p>
    </div>
  );
}
