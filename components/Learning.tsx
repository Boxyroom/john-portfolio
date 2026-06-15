const learningItems = [
  "AI-assisted workflows for research, prototyping, and product operations.",
  "Sharper systems architecture for scalable, maintainable applications.",
  "More expressive interaction design without sacrificing performance.",
];

export function Learning() {
  return (
    <section className="section-shell">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="section-kicker">Learning</p>
          <h2 className="section-heading">
            Always adding better tools to the belt.
          </h2>
        </div>
        <div className="space-y-4">
          {learningItems.map((item) => (
            <p
              className="rounded-sm border border-bone/10 bg-charcoal-2/80 p-6 text-lg font-semibold leading-8 text-bone shadow-inset"
              key={item}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
