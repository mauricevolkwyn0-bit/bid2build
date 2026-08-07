"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateContractorProfile(
  userId: string,
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    entityType: string;
    companyName: string;
    companyRegNumber: string;
    isVatRegistered: boolean;
    vatNumber: string;
  }
) {
  const supabase = await createClient();

  const { error: authError } = await supabase.auth.updateUser({
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
    },
  });

  if (authError) return { error: authError.message };

  const { error: profileError } = await supabase
    .from("contractor_profiles")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      entity_type: data.entityType,
      company_name: data.companyName || null,
      company_registration_number: data.companyRegNumber || null,
      is_vat_registered: data.isVatRegistered,
      vat_number: data.vatNumber || null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (profileError) return { error: profileError.message };

  await supabase
    .from("users")
    .update({ cellphone_number: data.phone, updated_at: new Date().toISOString() })
    .eq("id", userId);

  return { success: true };
}
