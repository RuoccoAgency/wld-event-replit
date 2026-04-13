import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Plus, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHrAuth } from "@/contexts/HrAuthContext";

interface PerformanceRow {
  id: number;
  date: string;
  contractsCount: number;
  modulesCount: number;
  note: string | null;
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function PerformanceWidget() {
  const { accessToken } = useHrAuth();
  const [history, setHistory] = useState<PerformanceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [incrementing, setIncrementing] = useState<"contracts" | "modules" | null>(null);
  const [noteContracts, setNoteContracts] = useState("");
  const [noteModules, setNoteModules] = useState("");

  const todayRow = history.find((r) => r.date === todayISO()) ?? null;

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/hr/performance/mine?limit=30", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) return;
      const data: PerformanceRow[] = await res.json();
      setHistory(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const increment = async (field: "contracts" | "modules") => {
    const note = field === "contracts" ? noteContracts : noteModules;
    setIncrementing(field);
    try {
      const res = await fetch("/api/hr/performance/increment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ field, note: note.trim() || undefined }),
      });
      if (!res.ok) {
        toast.error("Errore durante l'aggiornamento");
        return;
      }
      if (field === "contracts") setNoteContracts("");
      else setNoteModules("");
      toast.success("Aggiornato ✓");
      await fetchHistory();
    } catch {
      toast.error("Errore di rete");
    } finally {
      setIncrementing(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp size={16} className="text-primary" />
        <h2 className="text-sm font-semibold text-zinc-700">Performance</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Contracts card */}
        <Card className="border border-zinc-200 shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Contratti oggi
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            <p className="text-3xl font-bold text-zinc-800">
              {loading ? "—" : (todayRow?.contractsCount ?? 0)}
            </p>
            <Input
              placeholder="Nota opzionale…"
              value={noteContracts}
              onChange={(e) => setNoteContracts(e.target.value)}
              className="text-xs h-8"
              maxLength={120}
            />
            <Button
              size="sm"
              className="w-full h-8 text-xs gap-1"
              disabled={incrementing !== null}
              onClick={() => increment("contracts")}
            >
              <Plus size={13} />
              {incrementing === "contracts" ? "..." : "+1 Contratto"}
            </Button>
          </CardContent>
        </Card>

        {/* Modules card */}
        <Card className="border border-zinc-200 shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Moduli oggi
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            <p className="text-3xl font-bold text-zinc-800">
              {loading ? "—" : (todayRow?.modulesCount ?? 0)}
            </p>
            <Input
              placeholder="Nota opzionale…"
              value={noteModules}
              onChange={(e) => setNoteModules(e.target.value)}
              className="text-xs h-8"
              maxLength={120}
            />
            <Button
              size="sm"
              className="w-full h-8 text-xs gap-1"
              disabled={incrementing !== null}
              onClick={() => increment("modules")}
            >
              <Plus size={13} />
              {incrementing === "modules" ? "..." : "+1 Modulo"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* History table */}
      {history.length > 0 && (
        <Card className="border border-zinc-200 shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Storico
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="text-left px-4 py-2 text-zinc-400 font-medium">Data</th>
                    <th className="text-center px-4 py-2 text-zinc-400 font-medium">Contratti</th>
                    <th className="text-center px-4 py-2 text-zinc-400 font-medium">Moduli</th>
                    <th className="text-left px-4 py-2 text-zinc-400 font-medium">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row) => (
                    <tr key={row.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                      <td className="px-4 py-2 text-zinc-600 whitespace-nowrap">
                        {formatDate(row.date)}
                      </td>
                      <td className="px-4 py-2 text-center font-semibold text-zinc-800">
                        {row.contractsCount}
                      </td>
                      <td className="px-4 py-2 text-center font-semibold text-zinc-800">
                        {row.modulesCount}
                      </td>
                      <td className="px-4 py-2 text-zinc-400 max-w-[140px] truncate">
                        {row.note ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
