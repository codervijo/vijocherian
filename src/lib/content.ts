import thinPseo from "../content/posts/thin-pseo-pages.md?raw";
import viteSeo from "../content/posts/migrated-off-vite-for-seo.md?raw";
import pipeline from "../content/posts/trend-pipeline-is-the-asset.md?raw";
import yocto from "../content/posts/yocto-layer-organization.md?raw";
import kubelet from "../content/posts/kubelet-on-the-edge.md?raw";

export type ProjectStatus = "live" | "building" | "paused" | "idea";

export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
  url?: string;
  year: string;
}

export const projects: Project[] = [
  {
    name: "Swiftly",
    description: "YouTube trend detection pipeline.",
    status: "live",
    year: "2025",
  },
  {
    name: "TV platform",
    description: "Channel-based video aggregation.",
    status: "building",
    year: "2025",
  },
  {
    name: "SEO tools",
    description: "Free utilities for YouTube creators.",
    status: "building",
    year: "2025",
  },
  {
    name: "Virtually",
    description: "AI analyst concept.",
    status: "idea",
    year: "2026",
  },
];

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  body: string;
  readingTime: string;
}

function deriveTitle(body: string, fallback: string): string {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function readingTime(body: string): string {
  const words = body.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 220));
  return `${mins} min read`;
}

const raw: Array<{ slug: string; date: string; description: string; body: string }> = [
  {
    slug: "what-thin-pseo-pages-actually-look-like",
    date: "2026-05-12",
    description: "Programmatic SEO works when the data behind the template is genuinely useful.",
    body: thinPseo,
  },
  {
    slug: "why-i-migrated-off-vite-for-seo",
    date: "2026-04-03",
    description: "On choosing a framework that ships real HTML on first byte.",
    body: viteSeo,
  },
  {
    slug: "the-trend-pipeline-is-the-asset",
    date: "2026-02-18",
    description: "Software is replaceable. The data pipeline behind it is not.",
    body: pipeline,
  },
  {
    slug: "notes-on-yocto-layer-organization-at-scale",
    date: "2026-03-11",
    description: "A layer model that survives more than one product and one BSP revision.",
    body: yocto,
  },
  {
    slug: "what-kubelet-actually-does-on-a-constrained-edge-device",
    date: "2026-01-22",
    description: "Kubelet is a node-management daemon that happens to take orders from Kubernetes.",
    body: kubelet,
  },
];

export const posts: Post[] = raw
  .map((p) => ({
    ...p,
    title: deriveTitle(p.body, p.slug),
    readingTime: readingTime(p.body),
  }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatNum(n: number): string {
  return String(n).padStart(2, "0");
}
