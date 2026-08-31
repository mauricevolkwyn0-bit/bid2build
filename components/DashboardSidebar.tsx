"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

interface DashboardSidebarProps {
  role: "client" | "contractor";
  firstName: string;
  lastName: string;
}

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
  </svg>
);
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const clientNav = [
  { href: "/dashboard/client", label: "Dashboard", icon: <HomeIcon /> },
  { href: "/dashboard/client/post-job", label: "Post a Job", icon: <PlusIcon /> },
  { href: "/dashboard/client/jobs", label: "My Jobs", icon: <BriefcaseIcon /> },
  { href: "/dashboard/client/profile", label: "Profile", icon: <UserIcon /> },
];

const contractorNav = [
  { href: "/dashboard/contractor", label: "Dashboard", icon: <HomeIcon /> },
  { href: "/dashboard/contractor/jobs", label: "Browse Jobs", icon: <SearchIcon /> },
  { href: "/dashboard/contractor/bids", label: "My Bids", icon: <DocumentIcon /> },
  { href: "/dashboard/contractor/profile", label: "Profile", icon: <UserIcon /> },
];

export default function DashboardSidebar({ role, firstName, lastName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navItems = role === "client" ? clientNav : contractorNav;
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  return (
    <aside className="hidden lg:flex w-64 bg-brand h-full flex-col flex-shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Image src="/images/company_logo.png" alt="Built4U" width={140} height={46} />
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{firstName} {lastName}</p>
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 capitalize mt-0.5">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-brand-dark"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-gray-800">
        <SignOutButton />
      </div>
    </aside>
  );
}
