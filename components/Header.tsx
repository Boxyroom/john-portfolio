import { SectionLink } from "@/components/SectionLink";

const navItems = [
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-bone/10 bg-charcoal/88 backdrop-blur-xl">
      <nav className="container-shell flex items-center justify-between px-6 py-4 lg:px-8">
        <SectionLink className="flex items-center gap-3" href="#">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-copper/45 bg-charcoal-2 text-sm font-black tracking-[0.18em] text-copper-bright shadow-inset">
            JC
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-black text-bone">John Clavette</span>
            <span className="mt-1 hidden text-xs font-semibold leading-snug text-bone-muted sm:block">
              Craftsmanship, Creativity, and Code.
            </span>
          </span>
        </SectionLink>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <SectionLink
              className="text-sm font-bold text-bone-muted hover:text-copper-bright"
              href={item.href as `#${string}`}
              key={item.href}
            >
              {item.label}
            </SectionLink>
          ))}
        </div>
        <SectionLink
          className="rounded-sm border border-copper/50 px-5 py-2.5 text-sm font-black uppercase tracking-[0.12em] text-copper-bright hover:bg-copper hover:text-charcoal"
          href="#contact"
        >
          Build next
        </SectionLink>
      </nav>
    </header>
  );
}
