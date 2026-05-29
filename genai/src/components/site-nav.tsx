import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const items = [
  { to: "/", label: "Index" },
  { to: "/projects", label: "Projects" },
  { to: "/writing", label: "Writing" },
] as const;

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "dark"
      | "light"
      | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="transition-colors hover:text-[var(--color-accent)] text-muted-foreground"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

export function SiteNav() {
  return (
    <header className="no-print rule-b">
      <div className="mx-auto max-w-3xl px-6 py-5 flex items-baseline justify-between gap-6">
        <Link to="/" className="text-sm font-semibold tracking-tight uppercase text-foreground hover-underline">
          Vijo Cherian
        </Link>
        <nav className="flex items-baseline gap-7 text-[10px] uppercase tracking-[0.2em] font-medium">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              activeOptions={{ exact: it.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              {it.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print rule-t mt-24">
      <div className="mx-auto max-w-3xl px-6 py-8 flex flex-wrap items-baseline justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>© {new Date().getFullYear()} Vijo Cherian</span>
        <div className="flex gap-7">
          <a href="mailto:hello@example.com" className="transition-colors hover:text-foreground">Email</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">GitHub</a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">X</a>
        </div>
      </div>
    </footer>
  );
}