import HowItWorksVideos from "@/components/HowItWorksVideos";

export default function HowItWorks() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Hero */}
      <section className="bg-white py-20 px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Bid2Build makes it simple to connect clients with skilled contractors.
          Watch the steps below to see how easy it is to get started.
        </p>
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
