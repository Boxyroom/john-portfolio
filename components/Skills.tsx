const skillGroups = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Supabase", "REST APIs"],
  },
  {
    title: "AI & Computer Vision",
    skills: ["OpenAI API", "Python", "OpenCV", "Roboflow"],
  },
  {
    title: "Tools & Workflow",
    skills: ["Git", "GitHub", "VS Code", "Vercel"],
  },
];

export function Skills() {
  return (
    <section className="section-shell bg-charcoal-2/70" id="skills">
      <div className="container-shell">
        <div className="max-w-2xl">
          <p className="section-kicker">Skills</p>
          <h2 className="section-heading">
            A builder&apos;s toolkit for real applications.
          </h2>
          <p className="body-copy mt-5">
            These are the technologies and tools I actively use to plan, build,
            connect, and deploy practical software.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div className="craft-card" key={group.title}>
              <h3 className="text-2xl font-black text-bone">{group.title}</h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    className="rounded-sm border border-bone/10 bg-charcoal px-4 py-2 text-sm font-bold text-bone-muted"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
