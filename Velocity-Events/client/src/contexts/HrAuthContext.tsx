import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getHrToken, setHrToken, clearHrToken, hrFetch } from "@/lib/hrAuth";

interface HrUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
}

interface HrAuthContextValue {
  user: HrUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const HrAuthContext = createContext<HrAuthContextValue | null>(null);

export function HrAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<HrUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    if (!getHrToken()) {
      setLoading(false);
      return;
    }
    try {
      const res = await hrFetch("/api/hr/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
        clearHrToken();
      }
    } catch {
      setUser(null);
      clearHrToken();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await fetch("/api/hr/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setHrToken(data.accessToken);
        }
      } catch {
      }
      await fetchMe();
    };
    tryRefresh();
  }, [fetchMe]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/hr/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { ok: false, error: data.message ?? "Credenziali non valide" };
      }
      const data = await res.json();
      setHrToken(data.accessToken);
      setUser(data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: "Errore di connessione" };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/hr/logout", { method: "POST", credentials: "include" });
    } catch {}
    clearHrToken();
    setUser(null);
    window.location.href = "/hr/login";
  }, []);

  return (
    <HrAuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </HrAuthContext.Provider>
  );
}

export function useHrAuth(): HrAuthContextValue {
  const ctx = useContext(HrAuthContext);
  if (!ctx) throw new Error("useHrAuth must be used within HrAuthProvider");
  return ctx;
}
