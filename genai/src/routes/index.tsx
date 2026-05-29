import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { projects, posts, formatDate, formatNum } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vijo Cherian — Independent founder and builder" },
      { name: "description", content: "Independent founder and builder working on Swiftly, a TV platform, and creator tooling." },
      { property: "og:title", content: "Vijo Cherian" },
      { property: "og:description", content: "Independent founder and builder." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const building = projects.filter((p) => p.status === "building" || p.status === "live");
  const recent = posts.slice(0, 3);
  return (
    <div className="mx-auto max-w-3xl px-6 fade-in">
      <section className="pt-16 pb-20">
        <div className="mb-8 flex items-center gap-3">
          <span className="tag">[00]</span>
          <span className="label-accent">Core_Intel</span>
        </div>
        <div className="grid md:grid-cols-[1fr_180px] gap-12">
          <div>
            <h1 className="text-2xl sm:text-3xl tracking-tight max-w-2xl text-foreground leading-snug">
              Vijo Cherian. Independent founder and builder.{" "}
              <span className="text-muted-foreground">Currently working on a</span>{" "}
              <span style={{ color: "var(--color-accent)" }}>YouTube trend detection pipeline</span>
              <span className="text-muted-foreground">, a channel-based video platform, and free tools for creators.</span>
            </h1>
            <p
              className="mt-8 text-[13px] max-w-xl italic"
              style={{ borderLeft: "0.5px solid var(--color-rule)", paddingLeft: "1rem", color: "var(--color-muted-foreground)" }}
            >
              Background in embedded Linux, Kubernetes, and cloud infrastructure.
            </p>
            <p className="mt-6 text-[13px] text-muted-foreground max-w-xl leading-relaxed">
              Previously in engineering and product. Based remotely. Writing occasionally about
              search, programmatic SEO, and what it actually takes to ship things alone.
            </p>
          </div>
          <div className="hidden md:block text-[10px] space-y-3 rule-l pl-6">
            <div className="uppercase tracking-widest" style={{ color: "var(--color-tertiary)" }}>Status</div>
            <div className="flex items-center gap-2">
              <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-accent)" }} />
              <span className="text-foreground tracking-widest">AVAILABLE</span>
            </div>
            <div className="uppercase tracking-widest pt-4" style={{ color: "var(--color-tertiary)" }}>Location</div>
            <div className="text-foreground tracking-widest">REMOTE_OS</div>
          </div>
        </div>
      </section>

      <SectionHeader
        num="01"
        label="Active_Processes"
        trailing={
          <Link to="/projects" className="label-accent transition-colors hover:!text-foreground">
            View Registry →
          </Link>
        }
      />
      <ul>
        {building.map((p, i) => (
          <li key={p.name} className="row-hover rule-b py-5 px-3 -mx-3 grid grid-cols-[2.5rem_1fr_auto] gap-4 items-center">
            <span className="num text-xs">{formatNum(i + 1)}</span>
            <div>
              <div className="text-sm font-semibold text-foreground">{p.name}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{p.description}</div>
            </div>
            <StatusBadge status={p.status} />
          </li>
        ))}
      </ul>

      <div className="mt-20" />
      <SectionHeader
        num="02"
        label="Stored_Entries"
        trailing={
          <Link to="/writing" className="label-accent transition-colors hover:!text-foreground">
            Archive →
          </Link>
        }
      />
      <ul>
        {recent.map((p, i) => (
          <li key={p.slug} className="row-hover rule-b py-5 px-3 -mx-3">
            <Link
              to="/writing/$slug"
              params={{ slug: p.slug }}
              className="grid grid-cols-[2.5rem_1fr_auto] gap-4 items-center group"
            >
              <span className="num text-xs">{formatNum(i + 1)}</span>
              <div>
                <div className="text-sm font-semibold text-foreground transition-colors group-hover:text-[var(--color-accent)]">
                  {p.title}
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">{p.description}</div>
              </div>
              <span className="num text-[10px] whitespace-nowrap uppercase tracking-widest">{formatDate(p.date)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeader({ num, label, trailing }: { num: string; label: string; trailing?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-6 rule-b pb-3">
      <div className="flex items-center gap-3">
        <span className="tag">[{num}]</span>
        <h2 className="label-accent">{label}</h2>
      </div>
      {trailing}
    </div>
  );
}

export function StatusBadge({ status }: { status: "live" | "building" | "paused" | "idea" }) {
  const cls = status === "live" ? "chip chip-live" : "chip";
  return <span className={cls}>{status}</span>;
}
