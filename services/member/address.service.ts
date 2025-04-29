import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Address } from "@/types/member/Address";

export function getAddresses(): Promise<Address[]> {
  return fetchWithAuth<Address[]>(`${API_URL}/addresses`);
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
  id: number,
  data: Partial<Address>
): Promise<Address> {
  const res = await fetchWithAuth(`${API_URL}/addresses/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update address");
  }

  return res.json();
}

export async function setDefaultAddress(id: number): Promise<Address> {
  const res = await fetchWithAuth(`${API_URL}/addresses/${id}/default`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to set default address");
  }

  return res.json();
}

export async function deleteAddress(id: number): Promise<void> {
  const res = await fetchWithAuth(`${API_URL}/addresses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete address");
  }
}
