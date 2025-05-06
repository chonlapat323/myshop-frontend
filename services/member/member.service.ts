import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import {
  MemberInfo,
  MemberProfileForm,
} from "@/types/member/member-profile-form";
import { redirect } from "next/navigation";

export function getMemberInfo(): Promise<MemberInfo> {
  return fetchWithAuth<MemberInfo>(`${API_URL}/users/me`, {
    method: "GET",
  });
}

export function updateMemberInfo(data: FormData): Promise<MemberInfo> {
  return fetchWithAuth<MemberInfo>(`${API_URL}/users/me`, {
    method: "PATCH",
    body: data,
  });
}

export const logoutUser = async (): Promise<void> => {
  await fetch(`${API_URL}/auth/logout_member`, {
    method: "POST",
    credentials: "include",
  });
  redirect("/login");
};
