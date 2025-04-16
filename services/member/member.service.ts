import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { MemberProfileForm } from "@/types/member/MemberProfileForm";
import { redirect } from "next/navigation";

export async function getMemberInfo(): Promise<MemberProfileForm> {
  const res = await fetchWithAuth(`${API_URL}/users/me`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("ไม่สามารถโหลดข้อมูลสมาชิก");
  }

  const data = await res.json();

  return {
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phoneNumber: data.phone_number,
    avatarUrl: data.avatar_url,
  };
}

export async function updateMemberInfo(data: MemberProfileForm): Promise<void> {
  const res = await fetchWithAuth(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      avatar_url: data.avatarUrl,
    }),
  });

  if (!res.ok) {
    throw new Error("ไม่สามารถอัปเดตข้อมูลสมาชิก");
  }
}

export const logoutUser = async (): Promise<void> => {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  redirect("/login");
};
