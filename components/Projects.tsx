const projects = [
  {
    name: "MovieLand",
    type: "React Application",
    description: "Movie discovery app that helps users search and browse titles from the TMDB API with live data, clear state handling, and a responsive component structure.",
    technologies: ["React", "TMDB API", "JavaScript", "CSS"],
    githubUrl: "https://github.com/Boxyroom/MovieLand",
    liveUrl: "https://movie-land-sable-xi.vercel.app",
    previewAlt: "Placeholder preview for the MovieLand movie discovery application",
    previewLabel: "MovieLand",
    previewDetail: "Movie search interface",
  },
  {
    name: "NFT Marketplace",
    type: "Virtual Internship Project",
    description: "Frontend marketplace experience built during an internship to display NFT data, support routed views, and ship a responsive interface through a professional Git workflow.",
    technologies: ["React", "React Router", "Axios", "Firebase"],
    githubUrl: "https://github.com/Boxyroom/john-internship",
    liveUrl: "https://john-internship-ybmv.vercel.app/",
    previewAlt: "Placeholder preview for the NFT Marketplace internship project",
    previewLabel: "NFT Marketplace",
    previewDetail: "Marketplace product grid",
  },
  {
    name: "Summarist",
    type: "Advanced Internship Project",
    description: "Subscription-based reading platform built during an advanced frontend internship. Features modern application architecture, protected routes, premium content flows, user authentication, and payment integration.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Firebase"],
    githubUrl: "https://github.com/Boxyroom/john-advanced-internship",
    liveUrl: "https://john-advanced-internship.vercel.app/",
    previewAlt: "Placeholder preview for the Summarist premium reading platform",
    previewLabel: "SUMMARIST",
    previewDetail: "Premium reading platform",
  },
];

function ProjectPreview({
  alt,
  detail,
  label,
}: {
  alt: string;
  detail: string;
  label: string;
}) {
  return (
    <div
      aria-label={alt}
      className="mb-7 aspect-[16/10] overflow-hidden rounded-sm border border-bone/10 bg-[linear-gradient(135deg,#12100e_0%,#20343a_52%,#c87434_100%)] p-4 shadow-inset"
      role="img"
    >
      <div className="flex h-full flex-col justify-between rounded-sm border border-bone/10 bg-charcoal/60 p-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-copper-bright" />
          <span className="size-2 rounded-full bg-bone-muted/50" />
          <span className="size-2 rounded-full bg-steel/60" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-copper-bright">
            {label}
          </p>
          <p className="mt-2 text-lg font-black leading-tight text-bone">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section className="section-shell" id="projects">
      <div className="container-shell">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="section-kicker">Projects</p>
          <h2 className="section-heading">
            Selected work shaped for clarity, utility, and trust.
          </h2>
        </div>
        <a className="text-sm font-black uppercase tracking-[0.12em] text-copper-bright underline-offset-4 hover:text-bone hover:underline" href="#contact">
          Discuss a build
        </a>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            className="craft-card group flex flex-col transition"
            key={project.name}
          >
            <ProjectPreview
              alt={project.previewAlt}
              detail={project.previewDetail}
              label={project.previewLabel}
            />
            <p className="text-sm font-black uppercase tracking-[0.16em] text-steel">
              {project.type}
            </p>
            <h3 className="mt-16 text-3xl font-black text-bone">{project.name}</h3>
            <p className="body-copy mt-4">{project.description}</p>
            <div className="mt-6">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-copper-bright">
                Technologies
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    className="rounded-sm border border-bone/10 bg-charcoal px-3 py-1.5 text-xs font-bold text-bone-muted"
                    key={technology}
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-3 border-t border-bone/10 pt-6 sm:flex-row">
              <a
                aria-label={`View source code for ${project.name}`}
                className="inline-flex items-center justify-center rounded-sm border border-copper/50 px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-copper-bright hover:bg-copper hover:text-charcoal"
                href={project.githubUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                View Source
              </a>
              {project.liveUrl ? (
                <a
                  aria-label={`View live demo for ${project.name}`}
                  className="inline-flex items-center justify-center rounded-sm bg-copper px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-charcoal hover:bg-copper-bright"
                  href={project.liveUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Live Demo
                </a>
              ) : (
                <span className="inline-flex items-center justify-center rounded-sm border border-bone/10 px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-bone-muted">
                  In Development
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
