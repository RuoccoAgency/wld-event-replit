let _token: string | null = null;

export function getHrToken(): string | null {
  return _token;
}

export function setHrToken(token: string): void {
  _token = token;
}

export function clearHrToken(): void {
  _token = null;
}

export async function hrFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getHrToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> ?? {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (options.body && typeof options.body === "string") {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, { ...options, headers, credentials: "include" });

  if (res.status === 401) {
    clearHrToken();
    window.location.href = "/hr/login";
  }

  return res;
}
