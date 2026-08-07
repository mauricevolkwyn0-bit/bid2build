"use client";

import { useState } from "react";
import { updateContractorProfile } from "@/app/actions/contractor";

interface ProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  entityType: string;
  companyName: string;
  companyRegNumber: string;
  isVatRegistered: boolean;
  vatNumber: string;
}

interface Props {
  userId: string;
  initialData: ProfileData;
}

const inputClass = "rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full";
const labelClass = "text-sm font-medium text-gray-700 mb-1.5 block";

export default function ContractorProfileForm({ userId, initialData }: Props) {
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

    const result = await updateContractorProfile(userId, data);

    setSaving(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Personal Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Cell Phone Number</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputClass}
              placeholder="+27 82 000 0000"
            />
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Business Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Entity Type</label>
            <select
              value={data.entityType}
              onChange={(e) => set("entityType", e.target.value)}
              className={inputClass}
            >
              <option value="individual">Individual / Sole Trader</option>
              <option value="partnership">Partnership</option>
              <option value="close_corporation">Close Corporation (CC)</option>
              <option value="company">Company (Pty Ltd)</option>
            </select>
          </div>

          {data.entityType !== "individual" && (
            <>
              <div>
                <label className={labelClass}>Company Name</label>
                <input
                  type="text"
                  value={data.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                  className={inputClass}
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className={labelClass}>Registration Number</label>
                <input
                  type="text"
                  value={data.companyRegNumber}
                  onChange={(e) => set("companyRegNumber", e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 2023/123456/07"
                />
              </div>
            </>
          )}

          {/* VAT */}
          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => set("isVatRegistered", !data.isVatRegistered)}
                className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 cursor-pointer ${
                  data.isVatRegistered ? "bg-orange-500" : "bg-gray-200"
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${
                  data.isVatRegistered ? "translate-x-6" : "translate-x-1"
                }`} />
              </div>
              <span className="text-sm font-medium text-gray-700">VAT Registered</span>
            </label>
          </div>

          {data.isVatRegistered && (
            <div>
              <label className={labelClass}>VAT Number</label>
              <input
                type="text"
                value={data.vatNumber}
                onChange={(e) => set("vatNumber", e.target.value)}
                className={inputClass}
                placeholder="e.g. 4123456789"
              />
            </div>
          )}
        </div>
      </div>

      {/* Feedback */}
      {error && <p className="text-sm text-red-500">{error}</p>}
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
