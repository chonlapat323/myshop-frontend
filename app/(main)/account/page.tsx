"use client";

import { cookies } from "next/headers";

export default async function AccountPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;
  console.log(token);
  return <></>;
  //redirect("/account/personal-info");
}
