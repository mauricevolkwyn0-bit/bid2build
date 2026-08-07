import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ContractorProfileForm from "./ContractorProfileForm";

export default async function ContractorProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (user.user_metadata?.role !== "contractor") redirect("/dashboard/client");

  const { data: profile } = await supabase
    .from("contractor_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: publicUser } = await supabase
    .from("users")
    .select("cellphone_number")
    .eq("id", user.id)
    .single();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal and business information</p>
      </div>

      {/* Avatar section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {(user.user_metadata?.first_name?.[0] ?? "").toUpperCase()}
          {(user.user_metadata?.last_name?.[0] ?? "").toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {user.user_metadata?.first_name} {user.user_metadata?.last_name}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <span className="inline-block mt-1.5 text-xs px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 font-medium capitalize">
            Contractor
          </span>
        </div>
      </div>

      <ContractorProfileForm
        userId={user.id}
        initialData={{
          firstName: user.user_metadata?.first_name ?? "",
          lastName: user.user_metadata?.last_name ?? "",
          phone: publicUser?.cellphone_number ?? user.user_metadata?.phone ?? "",
          entityType: profile?.entity_type ?? "individual",
          companyName: profile?.company_name ?? "",
          companyRegNumber: profile?.company_registration_number ?? "",
          taxNumber: profile?.tax_number ?? "",
          isVatRegistered: profile?.is_vat_registered ?? false,
          vatNumber: profile?.vat_number ?? "",
          isNhbrcRegistered: profile?.is_nhbrc_registered ?? false,
          nhbrcLevel: profile?.nhbrc_level ?? "",
        }}
      />
    </div>
  );
}
