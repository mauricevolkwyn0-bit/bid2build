import Link from "next/link";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Built4U platform at built4u.co.za ("the Platform"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you must not use the Platform.

These Terms constitute a binding legal agreement between you and Built4U (Pty) Ltd, a company registered in the Republic of South Africa ("Built4U", "we", "us", or "our"). These Terms are governed by the laws of the Republic of South Africa.`,
  },
  {
    title: "2. Description of Service",
    content: `Built4U is an online marketplace that connects clients seeking construction, renovation, and trade services ("Clients") with qualified contractors and service providers ("Contractors"). The Platform enables Clients to post job listings, receive bids from Contractors, communicate, and process payments securely.

Built4U acts as an intermediary only. We are not a party to any contract formed between a Client and a Contractor through the Platform, nor do we employ Contractors or guarantee the quality of work performed.`,
  },
  {
    title: "3. Eligibility and Registration",
    content: `To use the Platform, you must:

• Be at least 18 years of age.
• Be legally capable of entering into binding contracts under South African law.
• Provide accurate, current, and complete registration information.
• Not have a previously suspended or terminated Built4U account.

You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately at support@built4u.co.za if you suspect unauthorised use of your account.`,
  },
  {
    title: "4. Client Obligations",
    content: `As a Client, you agree to:

• Provide accurate and complete job descriptions, budgets, and timelines.
• Respond to contractor enquiries in a timely manner.
• Pay the agreed amount plus any applicable platform fees promptly upon job completion.
• Not engage a Contractor directly outside of the Platform to circumvent platform fees within 12 months of first contact through Built4U.
• Treat all Contractors with respect and in compliance with applicable anti-discrimination laws.`,
  },
  {
    title: "5. Contractor Obligations",
    content: `As a Contractor, you agree to:

• Maintain all required licences, registrations, and insurance for the services you offer.
• Provide accurate information regarding your qualifications, experience, and availability.
• Only submit bids for work you are legally qualified and practically capable of completing.
• Deliver work to the standard described in your bid and as agreed with the Client.
• Comply with all applicable South African labour, safety, and building regulations.
• Not solicit Clients outside of the Platform to circumvent fees within 12 months of first contact.`,
  },
  {
    title: "6. Fees and Payments",
    content: `Platform Fees: Built4U charges a service fee on transactions processed through the Platform. Current fee rates are published on our Pricing & Fees page and may be updated with 30 days' notice.

Escrow: Client payments are held in a secure escrow account managed by Built4U or an authorised third-party payment processor. Funds are released to the Contractor only once the Client confirms that the work has been completed satisfactorily.

Disputes: In the event of a payment dispute, Built4U may hold funds in escrow pending resolution. See Section 10 for our dispute resolution process.

VAT: All fees are subject to Value Added Tax (VAT) at 15% where applicable under South African law.`,
  },
  {
    title: "7. Prohibited Conduct",
    content: `You agree not to:

• Use the Platform for any unlawful purpose or in violation of these Terms.
• Post false, misleading, or fraudulent job listings or bids.
• Harass, abuse, threaten, or intimidate other users.
• Attempt to gain unauthorised access to any part of the Platform or its infrastructure.
• Upload malware, viruses, or any harmful code.
• Scrape, copy, or reproduce Platform content without our prior written consent.
• Impersonate any person or entity.
• Post content that infringes third-party intellectual property rights.`,
  },
  {
    title: "8. Ratings and Reviews",
    content: `Following completion of a job, both Clients and Contractors may leave ratings and reviews. You agree that all reviews submitted are honest, accurate, and based on genuine first-hand experience. Built4U reserves the right to remove reviews that violate these Terms, are defamatory, or are otherwise inappropriate.`,
  },
  {
    title: "9. Intellectual Property",
    content: `All content on the Platform, including but not limited to text, graphics, logos, images, and software, is owned by or licensed to Built4U and is protected by South African and international intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without our prior written consent.

You retain ownership of content you upload to the Platform (e.g., profile photos, job descriptions) but grant Built4U a non-exclusive, royalty-free licence to use, display, and distribute such content for the purpose of operating the Platform.`,
  },
  {
    title: "10. Dispute Resolution",
    content: `In the event of a dispute between a Client and a Contractor, we encourage both parties to first attempt to resolve the matter directly. If no resolution is reached within 5 business days, either party may escalate the dispute to Built4U by contacting support@built4u.co.za.

Built4U will review the dispute in good faith and may request supporting evidence from both parties. Our decision in respect of any payment held in escrow is final, subject only to mandatory provisions of South African law.

These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any unresolved disputes shall be subject to the jurisdiction of the South Gauteng High Court, Johannesburg.`,
  },
  {
    title: "11. Limitation of Liability",
    content: `To the maximum extent permitted by applicable South African law:

• Built4U provides the Platform on an "as is" and "as available" basis without warranties of any kind.
• We do not guarantee the accuracy of listings, the quality of work performed by Contractors, or the accuracy of reviews.
• Built4U's total liability to you for any claim arising out of or relating to these Terms or your use of the Platform shall not exceed the total fees paid by you to Built4U in the 3 months preceding the claim.
• We are not liable for indirect, incidental, special, consequential, or punitive damages.

Nothing in these Terms excludes liability for fraud, death or personal injury caused by our negligence, or any other liability that cannot be excluded under South African law.`,
  },
  {
    title: "12. Termination",
    content: `Built4U reserves the right to suspend or terminate your account at any time, with or without notice, if we believe you have violated these Terms or applicable law. You may close your account at any time by contacting support@built4u.co.za. Termination does not relieve you of obligations arising before the date of termination.`,
  },
  {
    title: "13. Changes to These Terms",
    content: `We may update these Terms from time to time. Material changes will be communicated via email or a prominent notice on the Platform. Your continued use of the Platform after the effective date of any change constitutes your acceptance of the revised Terms.`,
  },
  {
    title: "14. Contact",
    content: `Questions regarding these Terms should be directed to:

Built4U (Pty) Ltd
Email: legal@built4u.co.za
Phone: +27 75 001 0317
Address: 10 Horridus Place, Montana Park, Pretoria, 0182`,
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16 px-4 text-center">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-2">Terms &amp; Conditions</h1>
        <p className="text-sm text-gray-400">Last updated: 7 August 2026</p>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-10 flex flex-col gap-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-semibold text-gray-900 mb-3">{s.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{s.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pb-14 px-4 text-center">
        <p className="text-sm text-gray-500 mb-4">Questions about our terms?</p>
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
