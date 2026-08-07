import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PostJobForm from "./PostJobForm";

export default async function PostJobPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (user.user_metadata?.role !== "client") redirect("/dashboard/contractor");

  const { data: categories } = await supabase
    .from("job_categories")
    .select("id, name")
    .is("parent_id", null)
    .order("name");

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Post a Job</h1>
        <p className="text-gray-500 mt-1">Fill in the details below to start receiving bids from contractors</p>
      </div>
      <PostJobForm categories={categories ?? []} />
    </div>
  );
}
