import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-100 px-8 py-3 flex items-center">
      <Link href="/" className="flex items-center gap-2 mr-12">
        <Image
          src="/images/company_logo.png"
          alt="Just Work logo"
          width={48}
          height={48}
          priority
        />
      </Link>

      <div className="flex items-center gap-8 flex-1">
        <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Home
        </Link>
        <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          How It Works
        </Link>
        <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          FAQ
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-2">
          Login
        </Link>
        <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-5">
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-5">
          <Link href="/post-a-job">Post a Job</Link>
        </Button>
      </div>
    </nav>
  );
}
