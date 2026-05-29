import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { marked } from "marked";
import { getPost, formatDate, posts } from "@/lib/content";

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — Vijo Cherian` : "Writing — Vijo Cherian";
    const desc = post?.description ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/writing/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/writing/${params.slug}` }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                datePublished: post.date,
                author: { "@type": "Person", name: "Vijo Cherian" },
              }),
            },
          ]
        : undefined,
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="label mb-4">404</p>
      <h1 className="text-2xl">Post not found.</h1>
      <Link to="/writing" className="inline-block mt-6 hover-underline">Back to writing</Link>
    </div>
  ),
});

marked.setOptions({ gfm: true, breaks: false });

function PostPage() {
  const { post } = Route.useLoaderData();
  const html = marked.parse(post.body) as string;
  const bodyHtml = html.replace(/^\s*<h1[^>]*>.*?<\/h1>/i, "");
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = posts[idx + 1];
  const next = posts[idx - 1];

  return (
    <article className="mx-auto max-w-2xl px-6 fade-in">
      <header className="pt-16 pb-10 rule-b">
        <div className="flex items-baseline gap-3 mb-6">
          <Link to="/writing" className="label hover-underline">← Writing</Link>
        </div>
        <h1 className="text-3xl sm:text-4xl tracking-tight">{post.title}</h1>
        <div className="mt-5 flex gap-4 num text-sm">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div
        className="prose-editorial pt-8 text-[1.05rem]"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      <nav className="mt-20 rule-t pt-6 grid grid-cols-2 gap-6 text-sm">
        <div>
          {prev && (
            <Link to="/writing/$slug" params={{ slug: prev.slug }} className="block group">
              <div className="label mb-1">Previous</div>
              <div className="group-hover:underline underline-offset-4">{prev.title}</div>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link to="/writing/$slug" params={{ slug: next.slug }} className="block group">
              <div className="label mb-1">Next</div>
              <div className="group-hover:underline underline-offset-4">{next.title}</div>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}