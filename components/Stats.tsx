const stats = [
  { value: "28", label: "years in construction" },
  { value: "2nd", label: "career built with intent" },
  { value: "100%", label: "ownership mindset" },
  { value: "1", label: "standard: durable work" },
];

export function Stats() {
  return (
    <section className="border-y border-bone/10 bg-charcoal-2/70">
      <div className="container-shell grid gap-px px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div className="border-b border-bone/10 px-2 py-6 last:border-b-0 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0" key={stat.label}>
            <p className="text-5xl font-black text-copper-bright">{stat.value}</p>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-bone-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
