import { createFileRoute } from "@tanstack/react-router";
import { projects, formatNum, type ProjectStatus } from "@/lib/content";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Vijo Cherian" },
      { name: "description", content: "An archive of projects, shipped and unshipped." },
      { property: "og:title", content: "Projects — Vijo Cherian" },
      { property: "og:description", content: "An archive of projects, shipped and unshipped." },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const statusOrder: ProjectStatus[] = ["live", "building", "paused", "idea"];

function ProjectsPage() {
  const sorted = [...projects].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
  );
  return (
    <div className="mx-auto max-w-3xl px-6 fade-in">
      <header className="pt-16 pb-10">
        <p className="label mb-4">[01] &nbsp; Projects</p>
        <h1 className="text-2xl sm:text-3xl tracking-tight max-w-2xl">
          A working archive. Some live, some in progress, some shelved. Updated as things change.
        </h1>
      </header>

      <div className="grid grid-cols-[2.5rem_1fr_5rem_5rem] gap-4 label rule-t rule-b py-3">
        <span>№</span>
        <span>Project</span>
        <span>Year</span>
        <span className="text-right">Status</span>
      </div>

      <ul>
        {sorted.map((p, i) => (
          <li
            key={p.name}
            className="rule-b py-5 grid grid-cols-[2.5rem_1fr_5rem_5rem] gap-4 items-baseline"
          >
            <span className="num text-sm">{formatNum(i + 1)}</span>
            <div>
              <div className="text-base font-medium">{p.name}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{p.description}</div>
            </div>
            <span className="num text-sm">{p.year}</span>
            <span className="text-right text-sm">
              <StatusDot status={p.status} /> {p.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusDot({ status }: { status: ProjectStatus }) {
  const color =
    status === "live"
      ? "var(--color-foreground)"
      : status === "building"
        ? "var(--color-accent)"
        : status === "paused"
          ? "var(--color-tertiary)"
          : "transparent";
  return (
    <span
      aria-hidden
      className="inline-block w-1.5 h-1.5 mr-1.5 align-middle"
      style={{
        background: color,
        border: status === "idea" ? "0.5px solid var(--color-tertiary)" : "none",
      }}
    />
  );
}