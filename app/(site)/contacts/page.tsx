import Image from "next/image";
import OfficeMapWrapper from "@/components/OfficeMapWrapper";

export default function Contacts() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Hero */}
      <section className="relative w-full h-72 md:h-96">
        <Image
          src="/images/contact_1_hero.jpeg"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-lg text-white/80 max-w-xl">
            Have a question or need help? We'd love to hear from you. Fill in the
            form below and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-8 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Send us a message
          </h2>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="How can we help?"
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us more..."
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 transition-colors mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Get in touch
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our team is here to support you Monday through Friday, 8am – 6pm.
              We aim to respond to all enquiries within 24 hours.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 shrink-0">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-600">support@bid2build.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 shrink-0">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Phone</p>
                <p className="text-sm text-gray-600">+27 75 001 0317</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 shrink-0">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Location</p>
                <p className="text-sm text-gray-600">Johannesburg, South Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-8 pb-20 max-w-5xl mx-auto w-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Find Us</h2>
        <div className="w-full h-80 rounded-2xl overflow-hidden shadow-sm">
          <OfficeMapWrapper />
        </div>
        <p className="text-sm text-gray-500 mt-3">
          10 Horridus Place, Montana Park, Pretoria, 0182
        </p>
      </section>
    </div>
  );
}
