export function Hero() {
  return (
    <section className="container-shell grid min-h-[calc(100vh-73px)] items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div>
        <p className="section-kicker mb-5">
          28 years building in the field. Now building in code.
        </p>
        <h1 className="max-w-5xl text-5xl font-black leading-[0.98] text-bone sm:text-6xl lg:text-8xl">
          Software built with the discipline of a craftsman.
        </h1>
        <p className="body-copy mt-7 max-w-2xl">
          I bring decades of construction leadership into software development:
          planning carefully, solving under pressure, and delivering work that
          is clear, durable, and ready for real users.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <a className="btn-primary" href="#projects">
            View projects
          </a>
          <a className="btn-secondary" href="#contact">
            Start a conversation
          </a>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-sm border border-bone/10 bg-charcoal-2 p-5 shadow-glow">
        <div className="aspect-[4/5] rounded-sm border border-bone/10 bg-[linear-gradient(145deg,#28221c_0%,#20343a_45%,#c87434_100%)] p-6 text-bone">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.12em] text-bone/70">
              <span>Modern craft</span>
              <span>2026</span>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-charcoal">
                Current focus
              </p>
              <p className="mt-4 text-3xl font-black leading-tight text-white">
                Reliable interfaces, practical systems, and product decisions
                grounded in experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
