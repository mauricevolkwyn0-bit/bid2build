"use server";

import { createClient } from "@/lib/supabase/server";

export async function createJob(data: {
  title: string;
  description: string;
  categoryId: string;
  budgetMin: string;
  budgetMax: string;
  locationAddress: string;
  city: string;
  province: string;
  desiredStartDate: string;
  timeframeDays: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  // Geocode address via Mapbox
  let lng = 28.0473, lat = -26.2041; // fallback: Johannesburg
  try {
    const query = encodeURIComponent(`${data.locationAddress}, ${data.city}, ${data.province}, South Africa`);
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&country=ZA&limit=1`
    );
    const geo = await res.json();
    if (geo.features?.[0]?.center) {
      [lng, lat] = geo.features[0].center;
    }
  } catch {
    // use fallback
  }

  const { error } = await supabase.from("jobs").insert({
    client_id: user.id,
    title: data.title,
    description: data.description,
    category_id: data.categoryId || null,
    budget_min: data.budgetMin ? Number(data.budgetMin) : null,
    budget_max: data.budgetMax ? Number(data.budgetMax) : null,
    location_address: data.locationAddress,
    city: data.city || null,
    province: data.province || null,
    location_point: `SRID=4326;POINT(${lng} ${lat})`,
    desired_start_date: data.desiredStartDate || null,
    timeframe_days: data.timeframeDays ? Number(data.timeframeDays) : null,
    status: "open",
    date_posted: new Date().toISOString(),
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function updateClientProfile(
  userId: string,
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    hasCompany: boolean;
    companyName: string;
    companyRegNumber: string;
    isVatRegistered: boolean;
    vatNumber: string;
    taxNumber: string;
  }
) {
  const supabase = await createClient();

  const { error: authError } = await supabase.auth.updateUser({
    data: { first_name: data.firstName, last_name: data.lastName, phone: data.phone },
  });
  if (authError) return { error: authError.message };

  const { error: profileError } = await supabase
    .from("client_profiles")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      has_company: data.hasCompany,
      company_name: data.companyName || null,
      company_registration_number: data.companyRegNumber || null,
      is_vat_registered: data.isVatRegistered,
      vat_number: data.vatNumber || null,
      tax_number: data.taxNumber || null,
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
