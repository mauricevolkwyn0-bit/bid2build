"use client";

import { useState } from "react";
import { createJob } from "@/app/actions/client";

const inputClass = "rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full";
const labelClass = "text-sm font-medium text-gray-700 mb-1.5 block";

const SA_PROVINCES = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape",
  "Limpopo", "Mpumalanga", "North West", "Free State", "Northern Cape",
];

interface Category { id: string; name: string; }

export default function PostJobForm({ categories }: { categories: Category[] }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    budgetMin: "",
    budgetMax: "",
    locationAddress: "",
    city: "",
    province: "",
    desiredStartDate: "",
    timeframeDays: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const result = await createJob(form);
    setSaving(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setForm({
        title: "", description: "", categoryId: "", budgetMin: "",
        budgetMax: "", locationAddress: "", city: "", province: "",
        desiredStartDate: "", timeframeDays: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Job Details */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Job Details</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Job Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Bathroom renovation in Pretoria East"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => set("categoryId", e.target.value)}
              className={inputClass}
            >
              <option value="">Select a category…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Job Description <span className="text-red-500">*</span></label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={5}
              placeholder="Describe the work you need done in as much detail as possible…"
              className={`${inputClass} resize-none`}
              required
            />
          </div>
        </div>
      </div>

      {/* Budget & Timeline */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Budget &amp; Timeline</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Minimum Budget (ZAR)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">R</span>
              <input
                type="number"
                value={form.budgetMin}
                onChange={(e) => set("budgetMin", e.target.value)}
                placeholder="0"
                min="0"
                className={`${inputClass} pl-7`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Maximum Budget (ZAR)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">R</span>
              <input
                type="number"
                value={form.budgetMax}
                onChange={(e) => set("budgetMax", e.target.value)}
                placeholder="0"
                min="0"
                className={`${inputClass} pl-7`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Desired Start Date</label>
            <input
              type="date"
              value={form.desiredStartDate}
              onChange={(e) => set("desiredStartDate", e.target.value)}
              className={inputClass}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className={labelClass}>Estimated Duration (days)</label>
            <input
              type="number"
              value={form.timeframeDays}
              onChange={(e) => set("timeframeDays", e.target.value)}
              placeholder="e.g. 14"
              min="1"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Location</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Street Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.locationAddress}
              onChange={(e) => set("locationAddress", e.target.value)}
              placeholder="e.g. 12 Church Street, Arcadia"
              className={inputClass}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>City / Town</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="e.g. Pretoria"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Province</label>
              <select
                value={form.province}
                onChange={(e) => set("province", e.target.value)}
                className={inputClass}
              >
                <option value="">Select province…</option>
                {SA_PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
      {success && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Job posted successfully! Contractors can now find and bid on it.
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-8 py-3 transition-colors"
        >
          {saving ? "Posting…" : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Post Job
            </>
          )}
        </button>
        <p className="text-xs text-gray-400">Your job will be visible to all contractors immediately.</p>
      </div>
    </form>
  );
}
