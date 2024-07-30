// Incremental Static Regeneration (ISR)

// Use https://newsapi.org API to fetch news data by category.
// This API will require you to create an account to get an API key.

// NOTE: please add your own API key into a .env.local file

interface HeadlineError {
  code: string;
  message: string;
}

interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: Date;
  content: string | null;
}

interface Headline extends HeadlineError {
  status: "ok" | "error";
  totalResults: number;
  articles: Article[];
}

interface PageProps {
  params?: { category: string | undefined };
}

export async function generateStaticParams() {
  // these categories will be statically generated
  // I took these in the docs here https://newsapi.org/docs/endpoints/top-headlines
  // if there is an API where I could get all possible categories I missed it
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return categories.map((category) => ({ category }));
}

// IMPROVEMENT: we could debounce this function so that it would not react to every user key down
async function fetchHeadlinesByCategory(
  category: string
): Promise<Headline | undefined> {
  try {
    // "force-cache" is the default option for caching when fetching on the server using next js fetch.
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.ISR_NEWS_API_KEY}`,
      {
        next: {
          revalidate: 3600, // in seconds - this would allow new categories to be added every hour
        },
      }
    );

    // we are caching data at build time, therefore we won't be re-fetching at every page reload
    // we are revalidating though every hour, so technically there will be a rerender even after build
    console.log("Fetching headlines");

    if (!response.ok) {
      throw new Error(
        `Something went wrong while fetching headlines with category ${category}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function NewsPage({ params }: PageProps) {
  const category = params?.category;

  if (!category) {
    throw new Error(
      "Please provide a valid category (i.e. business, sports, health, etc.)"
    );
  }

  const headlines = await fetchHeadlinesByCategory(category);

  if (!headlines) {
    throw new Error("Something went wrong while fetching headlines");
  }

  if (headlines.status === "error") {
    throw new Error(`${headlines.code} - ${headlines.message}`);
  } else {
    const { totalResults, articles } = headlines;

    return (
      <div className="flex flex-col m-3">
        <h2 className="text-3xl font-bold m-3">{`Found ${totalResults} articles for the category ${category}`}</h2>
        {articles.map(({ title, author, content, source }) => (
          <div
            key={source.id + author + title}
            className="m-3 border border-black rounded-md p-3"
          >
            <h3>{`${title} - from ${author}`}</h3>
            {content && <p>{content}</p>}
          </div>
        ))}
      </div>
    );
  }
}
