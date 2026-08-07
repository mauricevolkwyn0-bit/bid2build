import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const role = (user.user_metadata?.role ?? "client") as "client" | "contractor";
  const firstName = user.user_metadata?.first_name ?? "";
  const lastName = user.user_metadata?.last_name ?? "";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <DashboardSidebar role={role} firstName={firstName} lastName={lastName} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
