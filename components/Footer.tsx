import { SectionLink } from "@/components/SectionLink";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 px-6 py-8 lg:px-8">
      <div className="container-shell flex flex-col gap-4 text-sm text-bone-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Modern Builder. Crafted with Next.js.</p>
        <div className="flex gap-5">
          <SectionLink className="hover:text-copper-bright" href="#projects">
            Work
          </SectionLink>
          <SectionLink className="hover:text-copper-bright" href="#skills">
            Skills
          </SectionLink>
          <SectionLink className="hover:text-copper-bright" href="#contact">
            Contact
          </SectionLink>
        </div>
      </div>
    </footer>
  );
}
