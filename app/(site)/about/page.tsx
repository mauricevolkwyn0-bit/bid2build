import Image from "next/image";
import Link from "next/link";
import PostJobButton from "@/components/PostJobButton";
import FindWorkButton from "@/components/FindWorkButton";

const values = [
  {
    title: "Transparency",
    description:
      "Every bid, every price, every contractor rating is visible upfront. No hidden fees, no surprises — just honest work at honest prices.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
  },
  {
    title: "Trust",
    description:
      "We vet every contractor on our platform. Verified profiles, reviews from real clients, and a secure payment system mean you can hire with confidence.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    ),
  },
  {
    title: "Access",
    description:
      "Whether you're in Cape Town or Limpopo, Bid2Build connects you with skilled tradespeople across all nine provinces of South Africa.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    ),
  },
  {
    title: "Quality",
    description:
      "Our rating system and dispute resolution process ensure that only the best contractors rise to the top — and that clients always get the work they paid for.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    ),
  },
];

const stats = [
  { value: "5+",    label: "Years in Business" },
  { value: "20k+",  label: "Happy Users" },
  { value: "8,300+",label: "Verified Contractors" },
  { value: "9",     label: "Provinces Covered" },
];

const milestones = [
  { year: "2019", text: "Bid2Build was founded in Johannesburg with a simple goal — make hiring tradespeople as easy as ordering online." },
  { year: "2021", text: "Expanded to all nine provinces and launched verified contractor profiles with real client reviews." },
  { year: "2023", text: "Crossed 10 000 registered users and launched the mobile-first platform used by contractors across South Africa." },
  { year: "2025", text: "Introduced the secure bid-fee payment system, ensuring only serious contractors compete for your project." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">

      {/* ── Hero ── */}
      <section className="relative w-full h-72 md:h-96">
        <Image
          src="/images/construction_site_enhanced.png"
          alt="About Bid2Build"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3">Our Story</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight max-w-2xl">
            Building Opportunities,<br className="hidden sm:block" /> One Bid at a Time
          </h1>
          <p className="text-white/75 text-sm sm:text-lg max-w-xl">
            We connect South African homeowners and businesses with skilled, verified contractors — simply, safely, and affordably.
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-gray-900 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <span className="text-2xl sm:text-4xl font-bold text-orange-500">{s.value}</span>
              <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/about_image.jpeg"
              alt="Bid2Build team"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Our Mission</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              Making skilled work accessible to everyone
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Bid2Build was founded with a simple belief — finding a reliable contractor shouldn't require knowing the right person. Whether you need a plumber in Pretoria, a builder in Cape Town, or an electrician in Durban, you deserve a fast, fair, and transparent way to get it done.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We built a platform where clients post jobs, contractors compete on merit, and every transaction is protected. The result is better outcomes for everyone — fairer prices, higher quality work, and contractors who grow their business on reputation rather than word of mouth alone.
            </p>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors w-fit"
            >
              See how it works
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 sm:py-24 px-4 bg-zinc-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    {v.icon}
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">How We Got Here</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Our Journey</h2>
          </div>
          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-[10px] font-bold text-white">{m.year}</span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 my-2" />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-10 ${i === milestones.length - 1 ? "pb-0" : ""}`}>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-2">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-orange-500 py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Ready to be part of it?
          </h2>
          <p className="text-orange-100 text-sm sm:text-lg mb-8 max-w-xl mx-auto">
            Join thousands of clients and contractors already using Bid2Build to get work done faster, smarter, and with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PostJobButton className="inline-flex items-center justify-center rounded-full bg-white text-orange-600 font-semibold px-8 py-3 hover:bg-orange-50 transition-colors w-full sm:w-auto" />
            <FindWorkButton className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white font-semibold px-8 py-3 hover:bg-gray-800 transition-colors w-full sm:w-auto" />
          </div>
        </div>
      </section>

    </div>
  );
}
