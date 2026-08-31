"use client";

import Image from "next/image";
import { signOut } from "@/app/actions/auth";

interface Props {
  firstName: string;
  lastName: string;
  role: "client" | "contractor";
}

export default function DashboardMobileHeader({ firstName, lastName, role }: Props) {
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  async function handleSignOut() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <header className="lg:hidden flex-shrink-0 bg-brand px-4 h-14 flex items-center justify-between">
      <Image
        src="/images/company_logo.png"
        alt="Built4U"
        width={120}
        height={40}
        className="h-8 w-auto"
      />

      <div className="flex items-center gap-3">
        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 capitalize font-medium">
          {role}
        </span>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
          {initials}
        </div>
        <button
          onClick={handleSignOut}
          aria-label="Sign out"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
}
