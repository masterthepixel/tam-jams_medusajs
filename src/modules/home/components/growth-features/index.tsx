const GrowthFeatures = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto rounded-[32px] bg-apple-tile1 px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-medium text-white/50 font-sans">What you get</p>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white">
            Features built for efficient growth
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/70 font-sans">
            From unlimited creative requests to transparent pricing, our operating system helps you scale acquisition with confidence.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:col-span-2 md:row-span-2">
          <div className="relative">
            <img
              src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/f2227b53-6c8a-42ab-a473-d7a119e14c95_1600w.jpg"
              alt="Neon next button 3D render"
              className="aspect-video w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-apple-blue/30 bg-apple-blue/15 px-2 py-0.5 text-[11px] font-semibold text-apple-blue font-sans">
                NEW
              </span>
              <span className="text-xs text-white/60 font-sans">Unlimited pipeline</span>
            </div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white">
              Launch experiments, not guesses
            </h3>
            <p className="mt-2 text-sm sm:text-base text-white/70 font-sans">
              Submit unlimited test ideas and creative requests. We prioritize by impact, ship fast, and report clearly so learnings stack every week.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10 font-sans"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
                See case studies
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-apple-blue px-4 py-2 text-sm font-medium text-white font-sans"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
                Start a request
              </a>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-semibold tracking-tight text-white">
                Requests & revisions
              </h3>
              <span className="inline-flex items-center rounded-full border border-apple-blue/30 bg-apple-blue/15 px-2 py-0.5 text-[11px] font-semibold text-apple-blue font-sans">
                NEW
              </span>
            </div>
            <p className="mt-2 text-sm text-white/70 font-sans">
              Iterate quickly with async requests and structured feedback. Every round ends with clear rationale and next steps.
            </p>
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
              <img
                src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/6e2b186b-730f-4956-8043-14955d1766bf_800w.jpg"
                alt="App UI preview"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-semibold tracking-tight text-white">
                Worry‑free pricing
              </h3>
              <span className="inline-flex items-center rounded-full border border-apple-blue/30 bg-apple-blue/15 px-2 py-0.5 text-[11px] font-semibold text-apple-blue font-sans">
                NEW
              </span>
            </div>
            <p className="mt-2 text-sm text-white/70 font-sans">
              Simple plans, no surprises. Pause anytime. Scale up when you're ready.
            </p>
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
              <img
                src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/dc543ce0-b776-4e3a-a6d5-933229659050_800w.jpg"
                alt="Pricing illustration"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-display font-semibold tracking-tight text-white">
              Quick turnaround
            </h3>
            <p className="mt-2 text-sm text-white/70 font-sans">
              Most tasks ship in 48–72 hours without sacrificing quality.
            </p>
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
              <img
                src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/91cceaf5-3a72-47d0-9d15-ee799cfea874_800w.jpg"
                alt="Speed dashboard"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-display font-semibold tracking-tight text-white">
              Go live in days
            </h3>
            <p className="mt-2 text-sm text-white/70 font-sans">
              From first brief to live campaigns in a week, with tracking and QA handled.
            </p>
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
              <img
                src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/70ea4bbd-c103-404b-bff1-cab817e4f4d6_800w.jpg"
                alt="Launch imagery"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="p-5 sm:p-6">
            <h3 className="text-lg font-display font-semibold tracking-tight text-white">
              Go live in days
            </h3>
            <p className="mt-2 text-sm text-white/70 font-sans">
              From first brief to live campaigns in a week, with tracking and QA handled.
            </p>
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
              <img
                src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/a0573e8d-a170-4eda-aba7-4f4fc78c43b7_800w.jpg"
                alt="Launch imagery"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GrowthFeatures
