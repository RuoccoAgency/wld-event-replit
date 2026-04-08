import { useState } from "react";
import { useLocation } from "wouter";
import { useHrAuth } from "@/contexts/HrAuthContext";

export default function HrLogin() {
  const { login, user, loading } = useHrAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    if (user.role === "admin") setLocation("/hr/admin");
    else setLocation("/hr/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await login(email, password);
      if (!result.ok) {
        setError(result.error ?? "Credenziali non valide");
        return;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Wedding Luxury Drive" className="h-16 w-auto mx-auto mb-4" />
          <p className="text-xs font-serif tracking-[0.2em] text-zinc-400 uppercase">Portale HR</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded shadow-sm p-8">
          <h1 className="text-lg font-serif text-zinc-800 mb-6 text-center">Accedi</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@azienda.it"
                required
                autoComplete="email"
                className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50 rounded mt-2"
            >
              {submitting ? "Accesso in corso..." : "Accedi"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
