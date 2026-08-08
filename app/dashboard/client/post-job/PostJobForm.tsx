"use client";

import { useState, useCallback, useRef } from "react";
import { createJob } from "@/app/actions/client";
import { createClient } from "@/lib/supabase/client";

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
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const addFiles = useCallback((files: FileList | File[]) => {
    const allowed = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!allowed.length) return;
    setImages((prev) => {
      const merged = [...prev, ...allowed].slice(0, 8);
      return merged;
    });
    setImagePreviews((prev) => {
      const urls = allowed.map((f) => URL.createObjectURL(f));
      return [...prev, ...urls].slice(0, 8);
    });
  }, []);

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  }

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    let imageUrls: string[] = [];
    if (images.length > 0) {
      const supabase = createClient();
      for (const file of images) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { data, error: uploadError } = await supabase.storage
          .from("job-images")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (uploadError) {
          setSaving(false);
          setError(`Image upload failed: ${uploadError.message}`);
          return;
        }
        const { data: { publicUrl } } = supabase.storage.from("job-images").getPublicUrl(data.path);
        imageUrls.push(publicUrl);
      }
    }

    const result = await createJob({ ...form, imageUrls });
    setSaving(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImages([]);
      setImagePreviews([]);
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

          <div>
            <label className={labelClass}>Photos <span className="text-gray-400 font-normal">(optional, up to 8)</span></label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-colors py-8 px-4 ${
                dragActive
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50/40"
              }`}
            >
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-orange-500">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10 MB each</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && addFiles(e.target.files)}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
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
