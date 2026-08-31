import Link from "next/link";

const sections = [
  {
    title: "1. Introduction",
    content: `Built4U (Pty) Ltd ("Built4U", "we", "us", or "our") is committed to protecting your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA) and all applicable South African privacy legislation.

This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website and platform at built4u.co.za. Please read this policy carefully. By using our services, you consent to the practices described herein.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect the following categories of personal information:

Identity & Contact Information: Full name, email address, phone number, and physical address.

Account Information: Username, password (stored in encrypted form), and account preferences.

Professional Information (Contractors): Business name, registration number, tax number, NHBRC registration, trade categories, certifications, and service areas.

Transaction Data: Payment records, job postings, bids submitted, contracts accepted, and escrow transactions.

Technical Data: IP address, browser type, device identifiers, pages visited, and referring URLs collected automatically when you use our platform.

Communications: Messages sent between users on our platform, and correspondence with our support team.`,
  },
  {
    title: "3. Purpose of Collection",
    content: `We use your personal information for the following purposes:

• To create and manage your account on the Built4U platform.
• To facilitate connections between clients and contractors.
• To process payments and manage escrow transactions.
• To verify contractor credentials and professional certifications.
• To send transactional communications such as bid notifications, job updates, and receipts.
• To send marketing communications where you have given consent.
• To comply with legal and regulatory obligations.
• To improve our platform, resolve disputes, and prevent fraud.
• To respond to support enquiries and resolve complaints.`,
  },
  {
    title: "4. Legal Basis for Processing",
    content: `We process your personal information on the following grounds under POPIA:

• Consent: Where you have given explicit permission for specific processing activities.
• Contractual necessity: To fulfil our obligations to you as a user of our platform.
• Legitimate interest: To operate, improve, and secure the platform, provided this does not override your rights.
• Legal obligation: To comply with applicable South African laws and regulations.`,
  },
  {
    title: "5. Sharing of Information",
    content: `We do not sell your personal information. We may share it with:

Service Providers: Third-party processors who assist us in operating the platform (e.g., payment processors, cloud hosting, email delivery, analytics). These parties are bound by data processing agreements and may only use your data for the purpose of providing their services.

Other Users: Limited profile information (name, trade, ratings, location) is visible to other users as necessary for the marketplace to function.

Legal Authorities: Where required by law, court order, or to protect the rights and safety of Built4U, its users, or the public.

Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity, subject to the same privacy protections.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain your personal information for as long as your account is active and for a period thereafter as required by law or legitimate business purposes. Transaction records are retained for a minimum of 5 years in compliance with South African tax and financial legislation. You may request deletion of your account and personal data at any time, subject to legal retention requirements.`,
  },
  {
    title: "7. Your Rights as a Data Subject",
    content: `Under POPIA, you have the right to:

• Be informed about the collection and use of your personal information.
• Access the personal information we hold about you.
• Correct or update inaccurate information.
• Request deletion of your personal information (subject to legal retention obligations).
• Object to the processing of your information for marketing purposes.
• Lodge a complaint with the Information Regulator of South Africa.

To exercise any of these rights, please contact our Information Officer at privacy@built4u.co.za.`,
  },
  {
    title: "8. Cookies",
    content: `We use cookies and similar technologies to enhance your experience on our platform. For full details on the types of cookies we use and how to manage them, please refer to our Cookie Policy.`,
  },
  {
    title: "9. Security",
    content: `We implement appropriate technical and organisational security measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. These include SSL encryption, access controls, and regular security assessments. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "10. Third-Party Links",
    content: `Our platform may contain links to third-party websites. This Privacy Policy does not apply to those sites and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    title: "11. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and, where appropriate, by email. Your continued use of the platform after any changes constitutes your acceptance of the revised policy.`,
  },
  {
    title: "12. Contact Us",
    content: `If you have any questions about this Privacy Policy or wish to exercise your rights, please contact our Information Officer:

Built4U (Pty) Ltd
Email: privacy@built4u.co.za
Phone: +27 75 001 0317
Address: 10 Horridus Place, Montana Park, Pretoria, 0182`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16 px-4 text-center">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-2">Privacy Policy</h1>
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
        <p className="text-sm text-gray-500 mb-4">Have a question about your privacy?</p>
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
