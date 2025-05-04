import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Address } from "@/types/member/address";

export function getAddresses(): Promise<Address[]> {
  return fetchWithAuth<Address[]>(`${API_URL}/addresses`);
}

export function createAddress(
  data: Omit<Address, "id" | "created_at" | "updated_at">
): Promise<Address> {
  return fetchWithAuth<Address>(`${API_URL}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateAddress(
  id: number,
  data: Partial<Address>
): Promise<Address> {
  return fetchWithAuth<Address>(`${API_URL}/addresses/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function setDefaultAddress(id: number): Promise<Address> {
  return fetchWithAuth<Address>(`${API_URL}/addresses/${id}/default`, {
    method: "PATCH",
  });
}

export function deleteAddress(id: number): Promise<void> {
  return fetchWithAuth<void>(`${API_URL}/addresses/${id}`, {
    method: "DELETE",
  });
}
