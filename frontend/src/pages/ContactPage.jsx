import Contact from "@/components/sections/Contact";

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-44 pb-16 bg-[#0A1128] text-white overflow-hidden">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-[#F26A21]/20 blur-[120px]" />
        <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] rounded-full bg-[#1B3A8C]/30 blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F26A21] mb-4">Get In Touch</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl">
            Free survey. <span className="gradient-text">Honest quote.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
            Tell us about your roof, your bill and your goals. A Saura expert will call you within 4 working hours.
          </p>
        </div>
      </section>
      <Contact />

      {/* Map */}
      <section className="pb-20 -mt-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
            <iframe
              title="Saura Energy Office"
              src="https://maps.google.com/maps?q=Badharghat%20Vivekananda%20Market%20Agartala%20Tripura&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
