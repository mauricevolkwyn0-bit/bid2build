"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSiteStatus(): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("site_active")
    .eq("id", 1)
    .single();
  return data?.site_active ?? true;
}

export async function setSiteActive(active: boolean): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.SITE_OWNER_EMAIL) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("site_settings")
    .update({ site_active: active, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  return { success: true };
}
