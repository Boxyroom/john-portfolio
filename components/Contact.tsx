export function Contact() {
  return (
    <section className="section-shell" id="contact">
      <div className="container-shell rounded-sm border border-copper/35 bg-[linear-gradient(135deg,#28221c_0%,#12100e_58%,#20343a_100%)] p-8 text-bone shadow-glow sm:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 className="section-heading">
              Have something worth building with care?
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <a className="btn-primary" href="mailto:hello@example.com">
              hello@example.com
            </a>
            <a className="btn-secondary" href="https://www.linkedin.com">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
