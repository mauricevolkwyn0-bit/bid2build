import { createClient } from "@/lib/supabase/server";
import { getSiteStatus } from "@/app/actions/site";
import ActivateButton from "./ActivateButton";

export const dynamic = "force-dynamic";

export default async function MaintenancePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = user?.email === process.env.SITE_OWNER_EMAIL;
  const isActive = await getSiteStatus();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10">
        <span className="text-4xl font-bold tracking-tight text-gray-900">
          Bid<span className="text-orange-500">2</span>Build
        </span>
      </div>

      {/* Icon */}
      <div className="w-24 h-24 bg-orange-50 border border-orange-100 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
        <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center leading-tight">
        We're Setting Things Up
      </h1>

      <p className="text-gray-500 text-center max-w-md mb-4 leading-relaxed">
        Bid2Build is almost ready. We're putting the final touches in place to connect homeowners with trusted contractors across South Africa.
      </p>

      <p className="text-sm text-gray-400 text-center mb-10">
        Check back soon — we'll be live before you know it.
      </p>

      {/* Divider */}
      <div className="w-16 h-px bg-gray-100 mb-10" />

      {/* Owner control panel */}
      {isOwner && (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 flex flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Site Owner</p>

            <div className="flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-green-500" : "bg-red-400"}`} />
              <span className="text-gray-600">
                Site is currently{" "}
                <span className={`font-semibold ${isActive ? "text-green-600" : "text-red-500"}`}>
                  {isActive ? "active" : "inactive"}
                </span>
              </span>
            </div>

            <ActivateButton isActive={isActive} />
          </div>

          <p className="text-xs text-gray-400 text-center">
            Activating the site makes it accessible to all visitors.
          </p>
        </div>
      )}
    </div>
  );
}
