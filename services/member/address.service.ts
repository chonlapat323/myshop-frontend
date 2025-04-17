import { Address } from "@/types/member/address";
import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function getAddresses(): Promise<Address[]> {
  const res = await fetchWithAuth(`${API_URL}/addresses`);
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
}

export async function createAddress(
  data: Omit<Address, "id" | "created_at" | "updated_at">
): Promise<Address> {
  const res = await fetchWithAuth(`${API_URL}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create address");
  }

  return await res.json();
}

export async function updateAddress(
  id: string,
  data: FormData
): Promise<Response> {
  return fetchWithAuth(`${API_URL}/addresses/${id}`, {
    method: "PATCH",
    body: data,
  });
}

export async function deleteAddress(id: string): Promise<Response> {
  return fetchWithAuth(`${API_URL}/addresses/${id}`, {
    method: "DELETE",
  });
}
