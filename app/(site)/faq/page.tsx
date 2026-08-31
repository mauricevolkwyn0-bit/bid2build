"use client";

import { useState } from "react";

const faqs = [
  {
    category: "General",
    items: [
      {
        question: "What is Built4U?",
        answer:
          "Built4U is an online marketplace that connects clients who need construction, renovation, or trade work done with qualified contractors and suppliers across South Africa. Clients post jobs, contractors submit bids, and clients choose the best fit.",
      },
      {
        question: "Is Built4U free to use?",
        answer:
          "Creating an account and browsing jobs is free. Clients pay a small service fee when hiring a contractor through the platform. Contractors may subscribe to a plan to access bid submissions and premium features.",
      },
      {
        question: "Which areas does Built4U cover?",
        answer:
          "Built4U currently operates across all 9 provinces of South Africa, with a strong focus on Gauteng, the Western Cape, and KwaZulu-Natal.",
      },
    ],
  },
  {
    category: "For Clients",
    items: [
      {
        question: "How do I post a job?",
        answer:
          "Simply register as a client, click 'Post a Job', describe the work you need done, set your budget and timeline, and publish. Contractors in your area will start submitting bids within hours.",
      },
      {
        question: "How do I choose the right contractor?",
        answer:
          "Review each contractor's profile, including their ratings, reviews, verified credentials, and past work. You can also message contractors directly before making a decision.",
      },
      {
        question: "What if I'm not happy with the work?",
        answer:
          "We have a dispute resolution process in place. If the work does not meet the agreed standard, contact our support team and we will help mediate a fair resolution between you and the contractor.",
      },
      {
        question: "How do I pay for a job?",
        answer:
          "Payments are handled securely through the Built4U platform. Funds are held in escrow and only released to the contractor once you confirm the work has been completed to your satisfaction.",
      },
    ],
  },
  {
    category: "For Contractors",
    items: [
      {
        question: "How do I register as a contractor?",
        answer:
          "Click 'Sign Up', select 'Contractor', complete your profile with your trade, qualifications, and service area, and submit your verification documents. Once approved, you can start bidding on jobs.",
      },
      {
        question: "How do I get notified of new jobs?",
        answer:
          "Once your profile is set up, you will receive real-time notifications via email and in-app alerts for new jobs that match your trade and location preferences.",
      },
      {
        question: "How do I submit a bid?",
        answer:
          "Browse available jobs, click on one that matches your skills, and submit a bid with your proposed price, timeline, and a short message to the client. You can update your bid before the client accepts.",
      },
      {
        question: "How do I get verified?",
        answer:
          "Upload your relevant certifications, ID, and business registration documents through your profile. Our team reviews and verifies submissions within 2–3 business days. Verified contractors receive a badge that builds client trust.",
      },
    ],
  },
  {
    category: "Payments & Fees",
    items: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept Visa and Mastercard credit and debit cards. EFT payment options are available for larger project values.",
      },
      {
        question: "When does a contractor receive payment?",
        answer:
          "Payment is released to the contractor once the client marks the job as complete and confirms satisfaction. This typically happens within 1–2 business days after confirmation.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No. All fees are disclosed upfront before you confirm any transaction. There are no hidden charges.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-semibold text-gray-900">{question}</span>
        <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500 transition-transform">
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm text-gray-600 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50">
      {/* Hero */}
      <section className="bg-white py-20 px-8 text-center">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Support</span>
        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Can't find what you're looking for? Reach out to us at{" "}
          <a href="mailto:info@built4u.co.za" className="text-orange-500 hover:underline">
            info@built4u.co.za
          </a>
        </p>
      </section>

      {/* FAQ sections */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">
                {section.category}
              </h2>
              <div className="bg-white rounded-2xl shadow-sm px-6 divide-y divide-gray-200">
                {section.items.map((item) => (
                  <AccordionItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-16 px-8 text-center mt-4">
        <h2 className="text-3xl font-bold text-white mb-3">Still have questions?</h2>
        <p className="text-orange-100 mb-8">Our support team is happy to help.</p>
        <a
          href="/contacts"
          className="inline-flex items-center justify-center rounded-full bg-white text-orange-600 font-semibold px-8 py-3 hover:bg-orange-50 transition-colors"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
