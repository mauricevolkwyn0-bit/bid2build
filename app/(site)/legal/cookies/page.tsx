import Link from "next/link";

const cookieTypes = [
  {
    name: "Strictly Necessary Cookies",
    required: true,
    description:
      "These cookies are essential for the Platform to function. They enable core features such as user authentication, session management, and security. You cannot opt out of these cookies as the Platform cannot function without them.",
    examples: [
      { name: "sb-auth-token", purpose: "Manages your authenticated session with Supabase." },
      { name: "csrf-token", purpose: "Protects against cross-site request forgery attacks." },
    ],
  },
  {
    name: "Functional Cookies",
    required: false,
    description:
      "Functional cookies allow the Platform to remember your preferences and settings to provide a more personalised experience. Disabling these cookies may affect Platform functionality.",
    examples: [
      { name: "user-preferences", purpose: "Remembers your dashboard layout and display preferences." },
      { name: "language", purpose: "Stores your preferred language setting." },
    ],
  },
  {
    name: "Analytics Cookies",
    required: false,
    description:
      "We use analytics cookies to understand how users interact with our Platform — which pages are most visited, how long sessions last, and where users encounter errors. This helps us improve the Platform. All data is aggregated and anonymised.",
    examples: [
      { name: "_ga, _gid", purpose: "Google Analytics cookies that track usage patterns." },
      { name: "_vercel_analytics", purpose: "Vercel Analytics for performance monitoring." },
    ],
  },
  {
    name: "Marketing & Advertising Cookies",
    required: false,
    description:
      "Marketing cookies are used to track visitors across websites to display relevant advertisements. We currently use these cookies only where you have given explicit consent. You can withdraw consent at any time.",
    examples: [
      { name: "_fbp", purpose: "Facebook Pixel — tracks conversions from Facebook ads." },
      { name: "_gcl_au", purpose: "Google Ads conversion tracking." },
    ],
  },
];

const sections = [
  {
    title: "What Are Cookies?",
    content: `Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, remember your preferences, and provide information to site owners.

Cookies may be "session cookies" (deleted when you close your browser) or "persistent cookies" (which remain on your device for a set period or until you delete them). They may be set by us ("first-party cookies") or by third-party services we use ("third-party cookies").`,
  },
  {
    title: "How We Use Cookies",
    content: `Bid2Build uses cookies and similar technologies (such as local storage and pixels) for the following purposes:

• To keep you logged in between visits.
• To secure the Platform against unauthorised access.
• To remember your preferences and settings.
• To analyse how the Platform is used so we can improve it.
• To measure the effectiveness of our marketing campaigns.`,
  },
  {
    title: "Third-Party Cookies",
    content: `Some cookies on the Platform are set by third-party providers whose services we use. These include:

Google Analytics — website analytics (privacy.google.com/businesses/compliance)
Vercel — hosting and performance analytics (vercel.com/legal/privacy-policy)
Facebook — advertising measurement (facebook.com/privacy/policy)
Google Ads — advertising measurement (policies.google.com/privacy)

We do not control these third-party cookies and recommend reviewing the privacy policies of each provider.`,
  },
  {
    title: "Your Consent",
    content: `When you first visit our Platform, you will be shown a cookie consent banner. You may accept all cookies or manage your preferences by category. Strictly necessary cookies are always active.

You can change your cookie preferences at any time by clicking "Cookie Settings" in the footer of our website.`,
  },
  {
    title: "Managing Cookies in Your Browser",
    content: `You can also manage and delete cookies directly through your browser settings. Most browsers allow you to:

• View cookies stored on your device.
• Delete individual or all cookies.
• Block cookies from specific websites.
• Block all third-party cookies.

Please note that blocking cookies may affect the functionality of our Platform. For guidance on managing cookies, visit your browser's help pages:

• Chrome: support.google.com/chrome
• Firefox: support.mozilla.org
• Safari: support.apple.com
• Edge: support.microsoft.com`,
  },
  {
    title: "Changes to This Cookie Policy",
    content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our services. We will notify you of material changes by updating the date on this page and, where appropriate, through a notice on the Platform.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions about our use of cookies, please contact us:

Bid2Build (Pty) Ltd
Email: privacy@bid2build.co.za
Phone: +27 75 001 0317
Address: 10 Horridus Place, Montana Park, Pretoria, 0182`,
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16 px-4 text-center">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-2">Cookie Policy</h1>
        <p className="text-sm text-gray-400">Last updated: 7 August 2026</p>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {/* Intro sections */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 flex flex-col gap-8">
            {sections.slice(0, 2).map((s) => (
              <div key={s.title}>
                <h2 className="text-base font-semibold text-gray-900 mb-3">{s.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{s.content}</p>
              </div>
            ))}
          </div>

          {/* Cookie type cards */}
          <h2 className="text-base font-semibold text-gray-900 px-1">Types of Cookies We Use</h2>
          {cookieTypes.map((type) => (
            <div key={type.name} className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-sm font-semibold text-gray-900">{type.name}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                  type.required
                    ? "bg-orange-100 text-orange-600"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {type.required ? "Always active" : "Optional"}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{type.description}</p>
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Cookie name</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {type.examples.map((ex) => (
                      <tr key={ex.name}>
                        <td className="px-4 py-2.5 font-mono text-gray-700">{ex.name}</td>
                        <td className="px-4 py-2.5 text-gray-500">{ex.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Remaining sections */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 flex flex-col gap-8">
            {sections.slice(2).map((s) => (
              <div key={s.title}>
                <h2 className="text-base font-semibold text-gray-900 mb-3">{s.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pb-14 px-4 text-center">
        <p className="text-sm text-gray-500 mb-4">Questions about cookies?</p>
        <Link
          href="/contacts"
          className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
