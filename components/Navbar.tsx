"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";

const navigation = [
  { name: "Home", href: "/" },
  { name: "How it Works", href: "/how-it-works" },
  { name: "Contacts", href: "/contacts" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-gray-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-orange-50 hover:text-orange-600 focus:outline-2 focus:-outline-offset-1 focus:outline-orange-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo + nav links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <Image
                  src="/images/company_logo.png"
                  alt="Just Work logo"
                  width={200}
                  height={80}
                  priority
                />
              </Link>
            </div>

            <div className="hidden sm:ml-10 sm:flex sm:items-center">
              <div className="flex space-x-2">
                {navigation.map((item) => {
                  const current = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={classNames(
                        current
                          ? "bg-orange-500 text-white"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-3 sm:static sm:inset-auto">
            <LoginModal />
            <SignupModal />
            <Link
              href="/post-a-job"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-5 py-2 transition-colors"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-4 pt-2 pb-4">
          {navigation.map((item) => {
            const current = pathname === item.href;
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={classNames(
                  current
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors"
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
          <div className="pt-2">
            <Link
              href="/post-a-job"
              className="block w-full text-center rounded-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-5 py-2 transition-colors"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
