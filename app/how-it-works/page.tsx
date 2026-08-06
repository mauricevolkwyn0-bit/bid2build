import Image from "next/image";
import HowItWorksVideos from "@/components/HowItWorksVideos";

export default function HowItWorks() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Hero */}
      <section className="relative w-full h-72 md:h-96">
        <Image
          src="/images/how_hero.jpeg"
          alt="How It Works"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
          <h1 className="text-4xl font-bold text-white mb-3">How It Works</h1>
          <p className="text-lg text-white/80 max-w-xl">
            Bid2Build makes it simple to connect clients with skilled contractors.
            Watch the steps below to see how easy it is to get started.
          </p>
        </div>
      </section>

      {/* Toggle + Videos */}
      <HowItWorksVideos />

      {/* CTA */}
      <section className="bg-orange-500 py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
        <p className="text-orange-100 mb-8 text-lg">
          Join thousands of people already using Bid2Build.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/post-a-job"
            className="inline-flex items-center justify-center rounded-full bg-white text-orange-600 font-semibold px-8 py-3 hover:bg-orange-50 transition-colors"
          >
            Post a Job
          </a>
          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border-2 border-white text-white font-semibold px-8 py-3 hover:bg-white/10 transition-colors"
          >
            Sign Up Free
          </a>
        </div>
      </section>
    </div>
  );
}
