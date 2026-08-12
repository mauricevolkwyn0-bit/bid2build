import Image from "next/image";
import Link from "next/link";
import PostJobButton from "@/components/PostJobButton";

const links = {
  "For Clients": [
    { label: "Post a Job", href: "/post-a-job" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Client Dashboard", href: "/dashboard/client" },
  ],
  "For Contractors": [
    { label: "Become a Contractor", href: "/signup?role=contractor" },
    { label: "Dashboard", href: "/dashboard/contractor" },
    { label: "Get Verified", href: "/get-verified" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contacts" },
    { label: "FAQ", href: "/faq" },
  ],
  Legal: [
    { label: "Pricing & Fees", href: "/legal/pricing" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms & Conditions", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          <Link href="/">
            <Image
              src="/images/company_logo.png"
              alt="Bid2Build logo"
              width={160}
              height={52}
              priority
            />
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            A simpler, faster way to connect clients with trusted contractors and suppliers across South Africa.
          </p>

          {/* Contact info */}
          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <a href="mailto:info@bid2build.co.za" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
              </svg>
              info@bid2build.co.za
            </a>
            <a href="tel:+27750010317" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +27 75 001 0317
            </a>
            <span className="flex items-start gap-2">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Johannesburg, South Africa
            </span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading} className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-900">{heading}</h3>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item.label}>
                  {item.label === "Post a Job" ? (
                    <PostJobButton
                      label="Post a Job"
                      className="text-sm text-gray-500 hover:text-orange-500 transition-colors"
                    />
                  ) : (
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Bid2Build. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>We accept:</span>
            <span className="inline-flex items-center rounded border border-gray-300 bg-white px-2 py-0.5 text-xs font-semibold text-gray-700">
              Visa
            </span>
            <span className="inline-flex items-center rounded border border-gray-300 bg-white px-2 py-0.5 text-xs font-semibold text-gray-700">
              Mastercard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
