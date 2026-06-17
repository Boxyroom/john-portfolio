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

export function Journey() {
  return (
    <section className="section-shell" id="journey">
      <div className="container-shell">
      <div className="max-w-2xl">
        <p className="section-kicker">Journey</p>
        <h2 className="section-heading">
          From job-site problem solving to software craftsmanship.
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
      </div>
      </div>
    </section>
  );
}
