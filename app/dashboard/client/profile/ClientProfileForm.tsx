"use client";

import { useState } from "react";
import { updateClientProfile } from "@/app/actions/client";

const SA_PROVINCES = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape",
  "Limpopo", "Mpumalanga", "North West", "Free State", "Northern Cape",
];

interface ProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  hasCompany: boolean;
  companyName: string;
  companyRegNumber: string;
  isVatRegistered: boolean;
  vatNumber: string;
  taxNumber: string;
  streetAddress: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
}

const inputClass = "rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full";
const labelClass = "text-sm font-medium text-gray-700 mb-1.5 block";

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={onToggle}
        className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${on ? "bg-orange-500" : "bg-gray-200"}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}

export default function ClientProfileForm({ userId, initialData }: { userId: string; initialData: ProfileData }) {
  const [data, setData] = useState<ProfileData>(initialData);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof ProfileData, value: string | boolean) {
    setData((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    const result = await updateClientProfile(userId, data);
    setSaving(false);
    if (result.error) setError(result.error);
    else setSuccess(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Personal Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input type="text" value={data.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input type="text" value={data.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputClass} required />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Cell Phone Number</label>
            <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+27 82 000 0000" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Tax Number</label>
            <input type="text" value={data.taxNumber} onChange={(e) => set("taxNumber", e.target.value)} placeholder="South African tax number" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Street Address</label>
            <input type="text" value={data.streetAddress} onChange={(e) => set("streetAddress", e.target.value)} placeholder="e.g. 12 Church Street" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Suburb</label>
            <input type="text" value={data.suburb} onChange={(e) => set("suburb", e.target.value)} placeholder="e.g. Arcadia" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City / Town</label>
            <input type="text" value={data.city} onChange={(e) => set("city", e.target.value)} placeholder="e.g. Pretoria" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Province</label>
            <select value={data.province} onChange={(e) => set("province", e.target.value)} className={inputClass}>
              <option value="">Select province…</option>
              {SA_PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Postal Code</label>
            <input type="text" value={data.postalCode} onChange={(e) => set("postalCode", e.target.value)} placeholder="e.g. 0083" className={inputClass} />
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Company Information</h3>
        <div className="flex flex-col gap-4">
          <Toggle on={data.hasCompany} onToggle={() => set("hasCompany", !data.hasCompany)} label="I am posting on behalf of a company" />

          {data.hasCompany && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className={labelClass}>Company Name</label>
                <input type="text" value={data.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="Your company name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Registration Number</label>
                <input type="text" value={data.companyRegNumber} onChange={(e) => set("companyRegNumber", e.target.value)} placeholder="e.g. 2023/123456/07" className={inputClass} />
              </div>
            </div>
          )}

          <Toggle on={data.isVatRegistered} onToggle={() => set("isVatRegistered", !data.isVatRegistered)} label="VAT Registered" />

          {data.isVatRegistered && (
            <div className="pt-1">
              <label className={labelClass}>VAT Number</label>
              <input type="text" value={data.vatNumber} onChange={(e) => set("vatNumber", e.target.value)} placeholder="e.g. 4123456789" className={inputClass} />
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
      {success && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Profile updated successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="self-start inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-8 py-3 transition-colors"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
