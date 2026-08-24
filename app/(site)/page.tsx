import Image from "next/image";
import Link from "next/link";
import HowItWorksSection from "@/components/HowItWorksSection";
import PostJobButton from "@/components/PostJobButton";
import FindWorkButton from "@/components/FindWorkButton";

export default function test() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">

      {/* ── Hero ── */}
      <section className="relative w-full h-[500px] sm:h-[600px]">
        <Image
          src="/images/home_hero.jpeg"
          alt="Bid2Build hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
            Connect with Credible and Professional Building Contractors
          </h1>
          <p className="text-sm sm:text-xl text-white/80 mb-8 max-w-xl">
            Post your new project for instant competitive quotes from contractors in and around your area. We have contractors ranging from builders, carpenters, plumbers, electricians, painters, and waterproofing specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
            <PostJobButton className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 transition-colors" />
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-full border-2 border-white text-white font-semibold text-sm px-6 py-2.5 hover:bg-white/10 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-gray-900 py-10 sm:py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { value: "12,500+", label: "Total Clients" },
            { value: "8,300+",  label: "Total Contractors" },
            { value: "R250M+",  label: "Total Project Value" },
            { value: "1,200+",  label: "Total Suppliers" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <span className="text-2xl sm:text-4xl font-bold text-orange-500">{s.value}</span>
              <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <HowItWorksSection />

      {/* ── About Us ── */}
      <section className="bg-zinc-50 py-12 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/about_image.jpeg"
              alt="About Bid2Build"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">About Us</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              Building Opportunities, One Bid at a Time
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Bid2Build is a construction bidding platform that seeks to connect clients looking to build or
              maintain an existing building structure with credible and competent contractors looking for
              building construction opportunities in and around their area.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our platform brings together clients, contractors, and suppliers in one trusted marketplace.
              Whether you&apos;re renovating your home, managing a construction project, or growing your trade
              business, Bid2Build gives you the tools to get it done with confidence.
            </p>
            <div className="flex gap-6 sm:gap-8 mt-1">
              {[
                { value: "5+",  label: "Years in Business" },
                { value: "20k+", label: "Happy Users" },
                { value: "9",   label: "Provinces Covered" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl sm:text-2xl font-bold text-orange-500">{s.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-1">
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video ── */}
      <section className="bg-gray-900 py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Watch &amp; Learn</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-2">See Bid2Build in Action</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-10 max-w-xl mx-auto">
            Watch how easy it is to post a job, receive bids, and get your project completed with confidence.
          </p>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/can_you_please_remove_the_logo.mp4"
              controls
              loop
              playsInline
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-orange-500 py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Ready to Build Something Great?
          </h2>
          <p className="text-orange-100 text-sm sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
            Join thousands of clients and contractors already using Bid2Build to get work done faster, smarter, and with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <PostJobButton className="inline-flex items-center justify-center rounded-full bg-white text-orange-600 font-semibold px-8 py-3 hover:bg-orange-50 transition-colors w-full sm:w-auto" />
            <FindWorkButton className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white font-semibold px-8 py-3 hover:bg-gray-800 transition-colors w-full sm:w-auto" />
          </div>
          <p className="text-orange-200 text-xs sm:text-sm mt-8 flex flex-wrap items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            No credit card required &bull; Free to get started &bull; Cancel anytime
          </p>
        </div>
      </section>

    </div>
  );
}
