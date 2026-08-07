"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

const inputClass =
  "rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent";

type Toast = { type: "success" | "error"; message: string };

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  function showToast(t: Toast) {
    setToast(t);
    setTimeout(() => setToast(null), 5000);
  }

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await submitContactForm(form);
    setLoading(false);

    if (result.error) {
      showToast({ type: "error", message: result.error });
    } else {
      showToast({ type: "success", message: "Message sent! We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="John Doe"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="john@example.com"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              value={form.subject}
              onChange={(e) => set("subject", e.target.value)}
              placeholder="How can we help?"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Tell us more..."
              required
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-8 py-3 transition-colors mt-2"
          >
            {loading ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[200] flex items-start gap-3 px-5 py-4 rounded-2xl shadow-xl text-sm max-w-sm text-white transition-all ${
            toast.type === "success" ? "bg-gray-900" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          )}
          <div className="flex-1">
            <p className="font-medium mb-0.5">
              {toast.type === "success" ? "Message sent!" : "Failed to send"}
            </p>
            <p className={`text-xs leading-relaxed ${toast.type === "success" ? "text-gray-400" : "text-red-200"}`}>
              {toast.message}
            </p>
          </div>
          <button onClick={() => setToast(null)} className="text-white/50 hover:text-white flex-shrink-0 ml-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
