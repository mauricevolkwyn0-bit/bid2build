import Image from "next/image";
import Link from "next/link";
import HowItWorksSection from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Hero */}
      <section className="relative w-full h-[600px]">
        <Image
          src="/images/hero_image.jpeg"
          alt="Bid2Build hero"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
          <h1 className="text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
            Connect with Skilled Professionals
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-xl">
            Post a job, receive bids, and hire the best tradespeople and
            contractors — all in one place.
          </p>
          <div className="flex gap-4">
            <Link
              href="/post-a-job"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 transition-colors"
            >
              Post a Job
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-full border-2 border-white text-white font-semibold px-8 py-3 hover:bg-white/10 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-bold text-orange-500">12,500+</span>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Total Clients</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-bold text-orange-500">8,300+</span>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Total Contractors</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-bold text-orange-500">R250M+</span>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Total Project Value</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-bold text-orange-500">1,200+</span>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Total Suppliers</span>
          </div>
        </div>
      </section>

      <HowItWorksSection />

      {/* About Us */}
      <section className="bg-zinc-50 py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Placeholder image */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden">
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M7.5 3.75h.008v.008H7.5V3.75zm0 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">
              Building Opportunities, <br className="hidden sm:block" /> One Bid at a Time
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bid2Build was founded with a simple mission — to connect people who need skilled work done with the
              professionals who can do it best. We believe that finding reliable tradespeople and contractors
              shouldn't be complicated or time-consuming.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform brings together clients, contractors, and suppliers in one trusted marketplace.
              Whether you're renovating your home, managing a construction project, or growing your trade
              business, Bid2Build gives you the tools to get it done with confidence.
            </p>
            <div className="flex gap-8 mt-2">
              <div>
                <p className="text-2xl font-bold text-orange-500">5+</p>
                <p className="text-sm text-gray-500 mt-0.5">Years in Business</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">20k+</p>
                <p className="text-sm text-gray-500 mt-0.5">Happy Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">9</p>
                <p className="text-sm text-gray-500 mt-0.5">Provinces Covered</p>
              </div>
            </div>
            <div className="mt-2">
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

      {/* Video Section */}
      <section className="bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Watch & Learn</span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-3">See Bid2Build in Action</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Watch how easy it is to post a job, receive bids, and get your project completed with confidence.
          </p>

          {/* Video embed — replace YOUR_YOUTUBE_VIDEO_ID with your actual YouTube video ID */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID"
              title="Bid2Build — How It Works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-500 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Ready to Build Something Great?
          </h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of clients and contractors already using Bid2Build to get work done faster, smarter, and with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/signup?role=client"
              className="inline-flex items-center justify-center rounded-full bg-white text-orange-600 font-semibold px-8 py-3 hover:bg-orange-50 transition-colors w-full sm:w-auto"
            >
              Post a Job
            </a>
            <a
              href="/signup?role=contractor"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white font-semibold px-8 py-3 hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              Find Work
            </a>
          </div>

          {/* Trust line */}
          <p className="text-orange-200 text-sm mt-10 flex items-center justify-center gap-2">
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
