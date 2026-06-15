const beliefs = [
  "Measure twice: understand the user problem before choosing the technical approach.",
  "Build with sequence: prototype, validate, refine, then harden for real use.",
  "Leave clean work behind: readable code, calm interfaces, and dependable handoffs.",
];

export function Mindset() {
  return (
    <section className="section-shell bg-blueprint/55 text-bone">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">Mindset</p>
          <h2 className="section-heading">
            The habits of a builder applied to software.
          </h2>
        </div>
        <div className="grid gap-4">
          {beliefs.map((belief, index) => (
            <div
              className="flex gap-5 rounded-sm border border-bone/10 bg-charcoal/45 p-6 shadow-inset hover:border-copper/40"
              key={belief}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-copper text-sm font-black text-charcoal">
                {index + 1}
              </span>
              <p className="text-xl font-semibold leading-8 text-bone">{belief}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
