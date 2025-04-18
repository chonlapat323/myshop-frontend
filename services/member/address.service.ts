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

export async function setDefaultAddress(id: string): Promise<Address> {
  const res = await fetchWithAuth(`${API_URL}/addresses/${id}/default`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to set default address");
  }

  return res.json();
}

export async function deleteAddress(id: string): Promise<void> {
  const res = await fetchWithAuth(`${API_URL}/addresses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete address");
  }
}
