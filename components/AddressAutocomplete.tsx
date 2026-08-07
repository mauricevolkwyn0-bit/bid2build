"use client";

import Autocomplete from "react-google-autocomplete";

interface AddressResult {
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (result: AddressResult) => void;
  className?: string;
  placeholder?: string;
}

const PROVINCE_MAP: Record<string, string> = {
  "Gauteng": "gauteng",
  "Western Cape": "western_cape",
  "KwaZulu-Natal": "kwazulu_natal",
  "Eastern Cape": "eastern_cape",
  "Limpopo": "limpopo",
  "Mpumalanga": "mpumalanga",
  "North West": "north_west",
  "Northern Cape": "northern_cape",
  "Free State": "free_state",
};

function getComponent(
  components: google.maps.GeocoderAddressComponent[],
  type: string,
  nameType: "long_name" | "short_name" = "long_name"
) {
  return components.find((c) => c.types.includes(type))?.[nameType] ?? "";
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelected,
  className,
  placeholder,
}: Props) {
  function handlePlace(place: google.maps.places.PlaceResult) {
    const components = place.address_components ?? [];

    const streetNumber = getComponent(components, "street_number");
    const route = getComponent(components, "route");
    const suburb =
      getComponent(components, "sublocality_level_1") ||
      getComponent(components, "sublocality");
    const city =
      getComponent(components, "locality") ||
      getComponent(components, "administrative_area_level_2");
    const provinceLong = getComponent(components, "administrative_area_level_1");
    const postalCode = getComponent(components, "postal_code");

    const addressLine1 = [streetNumber, route].filter(Boolean).join(" ");

    onPlaceSelected({
      addressLine1,
      addressLine2: suburb,
      city,
      province: PROVINCE_MAP[provinceLong] ?? "",
      postalCode,
    });

    onChange(addressLine1);
  }

  if (!API_KEY) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Autocomplete
      apiKey={API_KEY}
      onPlaceSelected={handlePlace}
      options={{
        types: ["address"],
        componentRestrictions: { country: "za" },
        fields: ["address_components"],
      }}
      defaultValue={value}
      onChange={(e) => onChange((e.target as HTMLInputElement).value)}
      className={className}
      placeholder={placeholder}
    />
  );
}
