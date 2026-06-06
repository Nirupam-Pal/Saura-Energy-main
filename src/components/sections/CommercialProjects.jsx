import AnimatedCounter from "@/components/AnimatedCounter";

export default function CommercialProjects() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900">
            Commercial Solar Project
          </h2>
          <p className="mt-3 text-slate-600">Completed and upcoming commercial projects with installed and planned capacities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Completed */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#F26A21] via-[#1B3A8C] to-[#2BA84A] shadow-lg">
            <div className="bg-white rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Completed Project</h3>
                  <p className="mt-2 text-sm text-slate-600">Capacities commissioned and operational.</p>
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">Status</div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg p-5 bg-gradient-to-tr from-white/80 to-slate-50 border border-slate-100 shadow-sm">
                  <div className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1B3A8C] to-[#F26A21]">
                    <AnimatedCounter to={50} duration={1.6} suffix=" kW" />
                  </div>
                  <div className="mt-2 text-sm text-slate-600">Project A</div>
                </div>

                <div className="rounded-lg p-5 bg-gradient-to-tr from-white/80 to-slate-50 border border-slate-100 shadow-sm">
                  <div className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#1B3A8C] to-[#F26A21]">
                    <AnimatedCounter to={30} duration={1.6} suffix=" kW" />
                  </div>
                  <div className="mt-2 text-sm text-slate-600">Project B</div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#2BA84A] via-[#1B3A8C] to-[#F26A21] shadow-lg">
            <div className="bg-white rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Upcoming Project</h3>
                  <p className="mt-2 text-sm text-slate-600">Planned capacities in the pipeline.</p>
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">Planned</div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-lg p-4 bg-gradient-to-tr from-white/80 to-slate-50 border border-slate-100 shadow-sm text-center">
                  <div className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2BA84A] to-[#1B3A8C]">
                    <AnimatedCounter to={30} duration={1.6} suffix=" kW" />
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Site 1</div>
                </div>

                <div className="rounded-lg p-4 bg-gradient-to-tr from-white/80 to-slate-50 border border-slate-100 shadow-sm text-center">
                  <div className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2BA84A] to-[#1B3A8C]">
                    <AnimatedCounter to={50} duration={1.6} suffix=" kW" />
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Site 2</div>
                </div>

                <div className="rounded-lg p-4 bg-gradient-to-tr from-white/80 to-slate-50 border border-slate-100 shadow-sm text-center">
                  <div className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2BA84A] to-[#1B3A8C]">
                    <AnimatedCounter to={60} duration={1.6} suffix=" kW" />
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Site 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
