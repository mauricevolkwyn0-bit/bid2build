"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signIn } from "@/app/actions/auth";

interface Props {
  className?: string;
  label?: string;
}

export default function FindWorkButton({ className, label = "Find Work" }: Props) {
  const [toast, setToast] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  function showToastMsg(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 4500);
  }

  async function handleClick() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setShowLogin(true);
      return;
    }

    if (user.user_metadata?.role !== "contractor") {
      showToastMsg("Only contractors can find work. Please sign up or log in as a contractor.");
      return;
    }

    window.location.href = "/dashboard/contractor/jobs";
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    const result = await signIn(email, password);
    setLoading(false);

    if (result.error) {
      setLoginError(result.error);
      return;
    }

    if (result.role !== "contractor") {
      setShowLogin(false);
      showToastMsg("Only contractors can find work. Please sign up or log in as a contractor.");
      return;
    }

    window.location.href = "/dashboard/contractor/jobs";
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {label}
      </button>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[200] flex items-start gap-3 bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-xl text-sm max-w-sm">
          <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="font-medium mb-0.5">Contractors only</p>
            <p className="text-gray-400 text-xs leading-relaxed">{toast}</p>
          </div>
          <button onClick={() => setToast(null)} className="ml-2 text-gray-500 hover:text-white flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-5">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">Log in to find work</h2>
            <p className="text-sm text-gray-500 mb-6">
              Log in with your contractor account to browse jobs
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {loginError && <p className="text-sm text-red-500">{loginError}</p>}

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 transition-colors mt-1"
              >
                {loading ? "Logging in…" : "Log In & Find Work"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-5">
              Don&apos;t have a contractor account?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="text-orange-500 font-medium hover:underline"
              >
                Sign up as a contractor
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
