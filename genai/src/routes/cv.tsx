import { createFileRoute } from "@tanstack/react-router";
import { projects, formatNum } from "@/lib/content";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Vijo Cherian" },
      { name: "description", content: "Experience, projects, and stack." },
      { property: "og:title", content: "CV — Vijo Cherian" },
      { property: "og:description", content: "Experience, projects, and stack." },
    ],
    links: [{ rel: "canonical", href: "/cv" }],
  }),
  component: CV,
});

const expertise = [
  {
    title: "Embedded Linux",
    items: [
      "Yocto",
      "Buildroot",
      "U-Boot",
      "Kernel configuration",
      "Device drivers",
      "Cross-compilation",
      "Board bring-up",
      "BSP development",
      "Real-time Linux",
    ],
  },
  {
    title: "Linux systems",
    items: [
      "systemd",
      "Networking",
      "Performance tuning",
      "Kernel internals",
      "Containers (Docker, containerd)",
      "Shell and Python automation",
      "Observability",
    ],
  },
  {
    title: "Cloud and infrastructure",
    items: [
      "Kubernetes (cluster ops, operators, Helm)",
      "AWS and GCP",
      "Terraform",
      "CI/CD pipelines",
      "GitOps",
      "Service mesh",
      "Edge deployments",
    ],
  },
];

type ExperienceGroup = {
  label: string;
  entries: {
    role: string;
    org: string;
    period: string;
    notes: string[];
  }[];
};

const experience: ExperienceGroup[] = [
  {
    label: "Founder work",
    entries: [
      {
        role: "Independent founder and builder",
        org: "Self-directed — Swiftly, TV platform, creator SEO tools",
        period: "2024 — present",
        notes: [
          "Building Swiftly, a YouTube trend detection pipeline used by independent creators and small studios.",
          "Designing a channel-based video aggregation platform and shipping free SEO utilities as a distribution channel.",
          "Writing publicly about programmatic SEO, search, and the mechanics of solo product work.",
        ],
      },
    ],
  },
  {
    label: "Systems engineering",
    entries: [
      {
        role: "Senior cloud and platform engineer",
        org: "Company name",
        period: "YYYY — YYYY",
        notes: [
          "Owned Kubernetes platform for fleet-scale edge deployments, including operators and Helm-based release pipelines.",
          "Designed Terraform and GitOps workflows across AWS and GCP for multi-region production environments.",
          "Built observability and CI/CD pipelines used by application teams across the organization.",
        ],
      },
      {
        role: "Embedded Linux engineer",
        org: "Company name",
        period: "YYYY — YYYY",
        notes: [
          "Led board bring-up and BSP development on ARM platforms using Yocto and Buildroot.",
          "Tuned the Linux kernel and userspace for real-time workloads on constrained hardware.",
          "Maintained U-Boot, device drivers, and the device tree across multiple hardware revisions.",
        ],
      },
      {
        role: "Linux systems engineer",
        org: "Company name",
        period: "YYYY — YYYY",
        notes: [
          "Worked on systemd-based service architectures, networking, and performance tuning across production fleets.",
          "Automated provisioning and operational tooling in shell and Python.",
        ],
      },
    ],
  },
];

const stack = [
  "TypeScript", "React", "TanStack Start", "Node", "Python",
  "Postgres", "Redis", "ClickHouse", "Cloudflare", "BigQuery",
];

function CV() {
  return (
    <div className="mx-auto max-w-3xl px-6 fade-in">
      <div className="no-print pt-10 flex justify-end">
        <button
          onClick={() => window.print()}
          className="text-sm px-3 py-2 hover-underline"
          style={{ border: "0.5px solid var(--color-rule)" }}
        >
          Download PDF
        </button>
      </div>

      <header className="pt-8 pb-10 rule-b">
        <p className="label mb-4">Curriculum vitae</p>
        <h1 className="text-3xl tracking-tight">Vijo Cherian</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">
          Independent founder and builder. Engineering, search, and creator tooling.
        </p>
        <div className="mt-4 text-sm num flex flex-wrap gap-4">
          <a href="mailto:hello@example.com" className="hover-underline">hello@example.com</a>
          <a href="https://github.com" className="hover-underline">github.com</a>
          <a href="https://x.com" className="hover-underline">x.com</a>
        </div>
      </header>

      <Section num="01" title="Expertise">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
          {expertise.map((col, i) => (
            <div
              key={col.title}
              className="rule-b md:rule-b py-5 md:py-6 md:[&:not(:last-child)]:rule-r md:pr-6"
            >
              <p className="label mb-3">
                [E.{formatNum(i + 1)}] &nbsp; {col.title}
              </p>
              <ul className="text-sm space-y-1.5">
                {col.items.map((it) => (
                  <li key={it}>— {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section num="02" title="Experience">
        {experience.map((group, gi) => (
          <div key={group.label} className={gi > 0 ? "mt-10" : ""}>
            <p className="label mb-3">
              [E.{formatNum(gi + 1)}] &nbsp; {group.label}
            </p>
            <ul>
              {group.entries.map((e, i) => (
                <li
                  key={i}
                  className="rule-b py-6 grid grid-cols-[2.5rem_1fr_8rem] gap-4"
                >
                  <span className="num text-sm">{formatNum(i + 1)}</span>
                  <div>
                    <div className="font-medium">{e.role}</div>
                    <div className="text-sm text-muted-foreground">{e.org}</div>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {e.notes.map((n, j) => (
                        <li key={j}>— {n}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="num text-sm text-right">{e.period}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section num="03" title="Projects">
        <ul>
          {projects.map((p, i) => (
            <li key={p.name} className="rule-b py-5 grid grid-cols-[2.5rem_1fr_5rem] gap-4 items-baseline">
              <span className="num text-sm">{formatNum(i + 1)}</span>
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.description}</div>
              </div>
              <span className="text-sm text-right">{p.status}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section num="04" title="Stack">
        <p className="text-sm text-muted-foreground rule-b pb-6">
          {stack.join(" · ")}
        </p>
      </Section>
    </div>
  );
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="label mb-4">[{num}] &nbsp; {title}</h2>
      <div className="rule-t" />
      {children}
    </section>
  );
}