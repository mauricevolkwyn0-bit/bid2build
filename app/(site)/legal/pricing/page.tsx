import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for contractors just getting started on the platform.",
    features: [
      "Up to 5 active bids per month",
      "Public contractor profile",
      "Access to all job listings",
      "Basic in-app messaging",
      "Email notifications for new jobs",
    ],
    highlight: false,
    cta: "Get Started Free",
    href: "/signup?role=contractor",
  },
  {
    name: "Professional",
    price: "R299",
    period: "/ month",
    description: "For active contractors who want to win more jobs.",
    features: [
      "Unlimited bids per month",
      "Featured profile badge",
      "Priority listing in search results",
      "Advanced analytics dashboard",
      "Direct client messaging",
      "Bid tracking & history",
    ],
    highlight: true,
    cta: "Start Free Trial",
    href: "/signup?role=contractor&plan=professional",
  },
  {
    name: "Business",
    price: "R599",
    period: "/ month",
    description: "For established contractors and growing trade businesses.",
    features: [
      "Everything in Professional",
      "Verified Business badge",
      "Dedicated account manager",
      "Early access to new jobs",
      "Team member seats (up to 3)",
      "Monthly performance reports",
    ],
    highlight: false,
    cta: "Contact Sales",
    href: "/contacts",
  },
];

const fees = [
  {
    label: "Job posting",
    client: "Free",
    contractor: "—",
  },
  {
    label: "Platform service fee",
    client: "5% of job value",
    contractor: "—",
  },
  {
    label: "Payment processing",
    client: "Included in service fee",
    contractor: "—",
  },
  {
    label: "Contractor subscription",
    client: "—",
    contractor: "See plans above",
  },
  {
    label: "VAT (15%)",
    client: "Applied to service fee",
    contractor: "Applied to subscription",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-14 sm:py-20 px-4 text-center">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Transparent Pricing</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3">
          Simple, Fair Pricing
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
          Free for clients. Flexible plans for contractors. No hidden fees, ever.
        </p>
      </section>

      {/* Client pricing callout */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-orange-50 border border-orange-100 rounded-2xl px-6 py-6 sm:px-10 sm:py-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Clients — always free to post</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Posting a job, receiving bids, and messaging contractors is completely free. A{" "}
              <span className="font-semibold text-orange-600">5% platform service fee</span> (plus VAT) is only charged
              when you hire a contractor through Bid2Build. This covers secure escrow payments and our dispute resolution
              service.
            </p>
          </div>
          <Link
            href="/signup?role=client"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 text-sm transition-colors shrink-0"
          >
            Post a Job Free
          </Link>
        </div>
      </section>

      {/* Contractor plans */}
      <section className="pb-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">Contractor Plans</h2>
          <p className="text-sm text-gray-500 text-center mb-10">All plans include VAT. Cancel anytime.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 flex flex-col gap-5 ${
                  plan.highlight
                    ? "bg-gray-900 text-white ring-2 ring-orange-500"
                    : "bg-white shadow-sm"
                }`}
              >
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.highlight ? "text-orange-400" : "text-orange-500"}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className={`text-3xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                    {plan.period && (
                      <span className={`text-sm pb-0.5 ${plan.highlight ? "text-gray-400" : "text-gray-400"}`}>{plan.period}</span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${plan.highlight ? "text-gray-300" : "text-gray-500"}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className={plan.highlight ? "text-gray-200" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`inline-flex items-center justify-center rounded-full font-semibold px-6 py-2.5 text-sm transition-colors ${
                    plan.highlight
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee table */}
      <section className="bg-white border-t border-gray-100 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">Full Fee Schedule</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-700">Item</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-700">Clients</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-700">Contractors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fees.map((row) => (
                  <tr key={row.label}>
                    <td className="px-5 py-3.5 text-gray-700 font-medium">{row.label}</td>
                    <td className="px-5 py-3.5 text-gray-500">{row.client}</td>
                    <td className="px-5 py-3.5 text-gray-500">{row.contractor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            All pricing is in South African Rand (ZAR) and inclusive of 15% VAT where applicable. Prices may change with 30 days&apos; notice.
          </p>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-14 px-4 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Questions about pricing?</h2>
        <p className="text-sm text-gray-500 mb-6">Check our FAQ or reach out to our team.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center rounded-full border-2 border-gray-900 text-gray-900 font-semibold px-6 py-2.5 text-sm hover:bg-gray-900 hover:text-white transition-colors"
          >
            View FAQ
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
