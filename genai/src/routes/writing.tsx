import { createFileRoute, Link } from "@tanstack/react-router";
import { posts, formatDate, formatNum } from "@/lib/content";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Writing — Vijo Cherian" },
      { name: "description", content: "Essays on building, search, and creator tools." },
      { property: "og:title", content: "Writing — Vijo Cherian" },
      { property: "og:description", content: "Essays on building, search, and creator tools." },
    ],
    links: [{ rel: "canonical", href: "/writing" }],
  }),
  component: WritingIndex,
});

function WritingIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 fade-in">
      <header className="pt-16 pb-10">
        <p className="label mb-4">[02] &nbsp; Writing</p>
        <h1 className="text-2xl sm:text-3xl tracking-tight max-w-2xl">
          Occasional notes on shipping things, search, and the parts of building that don't make it
          into pitch decks.
        </h1>
      </header>

      <ul className="rule-t">
        {posts.map((p, i) => (
          <li key={p.slug} className="rule-b py-6">
            <Link
              to="/writing/$slug"
              params={{ slug: p.slug }}
              className="grid grid-cols-[2.5rem_1fr_auto] gap-4 items-baseline group"
            >
              <span className="num text-sm">{formatNum(i + 1)}</span>
              <div>
                <div className="text-base font-medium group-hover:underline underline-offset-4">
                  {p.title}
                </div>
                <div className="text-sm text-muted-foreground mt-1 max-w-xl">{p.description}</div>
                <div className="text-xs num mt-2">{p.readingTime}</div>
              </div>
              <span className="num text-xs whitespace-nowrap">{formatDate(p.date)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}