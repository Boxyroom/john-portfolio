const milestones = [
  {
    year: "Early spark",
    title: "Commodore 64",
    description: "My first experience with programming came as a kid experimenting with a Commodore 64. Even simple programs sparked a fascination with computers and problem solving.",
  },
  {
    year: "Foundation",
    title: "Computer Engineering Studies",
    description: "Completed two years of Computer Engineering studies at the University of Maine in Orono from 1995 to 1997, building a foundation in software development, mathematics, systems thinking, and technical problem solving.",
  },
  {
    year: "Career craft",
    title: "28 Years in Construction",
    description: "Built a 28-year career through strong work ethic, craftsmanship, leadership, and problem solving. Managed complex projects, coordinated teams, and delivered quality results under real-world deadlines and constraints.",
  },
  {
    year: "Now",
    title: "Returning to Software",
    description: "Reconnected with a lifelong passion for technology and began building modern web applications using JavaScript, React, Next.js, APIs, databases, and deployment tools.",
  },
];

const profileLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Boxyroom",
    ariaLabel: "Visit John Clavette's GitHub profile",
  },
  {
    label: "LinkedIn (Coming Soon)",
    href: "",
    ariaLabel: "John Clavette's LinkedIn profile is coming soon",
  },
];

export function Journey() {
  return (
    <section className="section-shell" id="about">
      <div className="container-shell">
        <div className="max-w-2xl">
          <p className="section-kicker">About</p>
          <h2 className="section-heading">
            My path from construction to software development.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {milestones.map((item) => (
            <article
              className="craft-card"
              key={item.title}
            >
              <p className="text-sm font-black uppercase tracking-[0.16em] text-copper-bright">{item.year}</p>
              <h3 className="mt-5 text-2xl font-black text-bone">{item.title}</h3>
              <p className="body-copy mt-4">{item.description}</p>
            </article>
          ))}
          <article className="craft-card grid gap-6 sm:grid-cols-[minmax(0,0.7fr)_1fr] sm:items-center lg:col-span-2">
            <figure>
              <div
                aria-label="Future portrait photo of John Clavette"
                className="flex aspect-[4/3] min-h-[180px] items-center justify-center overflow-hidden rounded-sm border border-bone/10 bg-[linear-gradient(145deg,#28221c_0%,#20343a_55%,#12100e_100%)] p-4 shadow-inset"
                role="img"
              >
                <div className="flex h-full w-full items-center justify-center rounded-sm border border-copper/30 bg-charcoal/55 text-center">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-copper-bright">
                    Photo Coming Soon
                  </span>
                </div>
              </div>
              <figcaption className="sr-only">
                Future portrait photo of John Clavette.
              </figcaption>
            </figure>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-copper-bright">
                John Clavette
              </p>
              <h3 className="mt-5 text-2xl font-black text-bone">
                Software Developer
              </h3>
              <p className="body-copy mt-4">Maine, USA</p>
              <div className="mt-6 border-t border-bone/10 pt-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-steel">
                  Connect
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profileLinks.map((link) =>
                    link.href ? (
                      <a
                        aria-label={link.ariaLabel}
                        className="inline-flex items-center justify-center rounded-sm border border-copper/50 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-copper-bright hover:bg-copper hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-copper-bright focus:ring-offset-2 focus:ring-offset-charcoal"
                        href={link.href}
                        key={link.label}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span
                        aria-label={link.ariaLabel}
                        className="inline-flex items-center justify-center rounded-sm border border-bone/10 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-bone-muted"
                        key={link.label}
                      >
                        {link.label}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
