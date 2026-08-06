"use client";

import { useState } from "react";

type Role = "client" | "contractor" | null;

export default function SignupModal() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role>(null);

  function handleClose() {
    setOpen(false);
    setRole(null);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 transition-colors"
      >
        Sign Up
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!role ? (
              /* Step 1 — choose role */
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h2>
                <p className="text-sm text-gray-500 mb-8">Who are you signing up as?</p>

                <div className="grid grid-cols-2 gap-4">
                  {/* Client block */}
                  <button
                    onClick={() => setRole("client")}
                    className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-gray-200 hover:border-orange-500 p-6 text-center transition-all hover:bg-blue-50"
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors">
                      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900 group-hover:text-orange-600">Client</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">I'm looking to post jobs and hire skilled professionals</p>
                    </div>
                  </button>

                  {/* Contractor block */}
                  <button
                    onClick={() => setRole("contractor")}
                    className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-gray-200 hover:border-orange-500 p-6 text-center transition-all hover:bg-blue-50"
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors">
                      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900 group-hover:text-orange-600">Contractor</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">I'm a tradesperson or professional looking for work</p>
                    </div>
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                  Already have an account?{" "}
                  <button onClick={handleClose} className="text-orange-500 font-medium hover:underline">
                    Log in
                  </button>
                </p>
              </>
            ) : (
              /* Step 2 — signup form */
              <>
                <button
                  onClick={() => setRole(null)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Back
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 capitalize">
                    {role}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                </div>

                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700" htmlFor="signup-first">First Name</label>
                      <input
                        id="signup-first"
                        type="text"
                        placeholder="John"
                        className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700" htmlFor="signup-last">Last Name</label>
                      <input
                        id="signup-last"
                        type="text"
                        placeholder="Doe"
                        className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700" htmlFor="signup-email">Email Address</label>
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700" htmlFor="signup-password">Password</label>
                    <input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700" htmlFor="signup-confirm">Confirm Password</label>
                    <input
                      id="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-colors mt-1"
                  >
                    Create Account
                  </button>
                </form>

                <p className="text-center text-xs text-gray-500 mt-4">
                  By signing up you agree to our{" "}
                  <a href="#" className="text-orange-500 hover:underline">Terms</a>{" "}
                  and{" "}
                  <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
