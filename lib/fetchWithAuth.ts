import { API_URL } from "@/lib/config";

export const fetchWithAuth = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  let res = await fetch(input, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.headers || {}),
    },
  });

  if (res.status === 401) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      res = await fetch(input, {
        ...init,
        credentials: "include",
        headers: {
          ...(init?.headers || {}),
        },
      });
    } else {
      window.location.href = "/login";
    }
  }

  return res;
};
