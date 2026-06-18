"use client";

import { useContactModal } from "@/components/ContactModal";
import { SectionLink } from "@/components/SectionLink";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

function BrandMark() {
  return (
    <span className="header-maker-mark flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-copper/45 bg-charcoal-2 shadow-inset">
      <svg
        aria-hidden="true"
        className="size-12"
        focusable="false"
        viewBox="0 0 760 360"
      >
        <defs>
          <linearGradient id="headerMarkCopperLine" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f4ead8" stopOpacity="0.9" />
            <stop offset="52%" stopColor="#e2954b" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#c87434" stopOpacity="0.72" />
          </linearGradient>
          <filter id="headerMarkGlow" x="-24%" y="-24%" width="148%" height="148%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="header-maker-mark-guides" fill="none">
          <path d="M184 70 H576" />
          <path d="M184 180 H576" />
          <path d="M184 290 H576" />
          <path d="M256 52 V306" />
          <path d="M330 52 V306" />
          <path d="M436 52 V306" />
          <path d="M512 52 V306" />
          <circle cx="458" cy="180" r="92" />
          <circle cx="458" cy="180" r="66" />
          <circle cx="292" cy="220" r="50" />
          <path d="M214 306 H546" />
        </g>

        <g className="header-maker-mark-construction" fill="none">
          <path d="M330 92 V212 C330 248 304 268 274 258" />
          <path d="M246 214 C244 238 258 256 282 262" />
          <path d="M508 118 C474 84 414 92 392 134" />
          <path d="M392 134 C366 184 386 246 440 260" />
          <path d="M440 260 C476 268 504 252 520 230" />
          <path d="M292 220 L458 180" />
        </g>

        <g className="header-maker-mark-final" fill="none">
          <path d="M330 92 V212 C330 248 304 268 274 258 C252 250 242 232 246 214" />
          <path d="M508 118 C476 88 418 94 392 134 C366 184 386 246 440 260 C476 268 504 252 520 230" />
          <path className="header-maker-mark-baseline" d="M236 288 H532" />
        </g>
      </svg>
    </span>
  );
}

export function Header() {
  const { openContactModal } = useContactModal();

  return (
    <header className="sticky top-0 z-50 border-b border-bone/10 bg-charcoal/88 backdrop-blur-xl">
      <nav className="container-shell flex items-center justify-between px-6 py-4 lg:px-8">
        <SectionLink className="flex items-center gap-3" href="#">
          <BrandMark />
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
        <button
          className="rounded-sm border border-copper/50 px-5 py-2.5 text-sm font-black uppercase tracking-[0.12em] text-copper-bright hover:bg-copper hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-copper-bright focus:ring-offset-2 focus:ring-offset-charcoal"
          onClick={(event) => openContactModal(event.currentTarget)}
          type="button"
        >
          Contact Me
        </button>
      </nav>
    </header>
  );
}
