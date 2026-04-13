import { useState, useEffect, useCallback } from "react";
import { Download, Trophy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hrFetch } from "@/lib/hrAuth";

interface LeaderboardRow {
  rank: number;
  userId: number;
  name: string;
  contractsTotal: number;
  modulesTotal: number;
}

interface LeaderboardData {
  from: string;
  to: string;
  rows: LeaderboardRow[];
}

function currentMonthRange(): { from: string; to: string } {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const to = now.toISOString().split("T")[0];
  return { from, to };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function PerformanceTab() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const defaultRange = currentMonthRange();
  const [fromInput, setFromInput] = useState(defaultRange.from);
  const [toInput, setToInput] = useState(defaultRange.to);
  const [activeFrom, setActiveFrom] = useState(defaultRange.from);
  const [activeTo, setActiveTo] = useState(defaultRange.to);

  const fetchLeaderboard = useCallback(
    async (from: string, to: string) => {
      setLoading(true);
      try {
        const res = await hrFetch(
          `/api/hr/performance/leaderboard?from=${from}&to=${to}`
        );
        if (!res.ok) return;
        const json: LeaderboardData = await res.json();
        setData(json);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchLeaderboard(activeFrom, activeTo);
  }, [fetchLeaderboard, activeFrom, activeTo]);

  const applyFilter = () => {
    if (!fromInput || !toInput) return;
    setActiveFrom(fromInput);
    setActiveTo(toInput);
  };

  const resetToCurrentMonth = () => {
    const range = currentMonthRange();
    setFromInput(range.from);
    setToInput(range.to);
    setActiveFrom(range.from);
    setActiveTo(range.to);
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      const res = await hrFetch(
        `/api/hr/performance/leaderboard/csv?from=${activeFrom}&to=${activeTo}`
      );
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leaderboard-${activeTo}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    } finally {
      setExporting(false);
    }
  };

  const rankMedal = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}`;
  };

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <Card className="border border-zinc-200 shadow-sm">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-400">Da</label>
              <input
                type="date"
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
                className="h-8 rounded border border-zinc-200 px-2 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-zinc-400">A</label>
              <input
                type="date"
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                className="h-8 rounded border border-zinc-200 px-2 text-xs text-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={applyFilter}>
              Applica
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs gap-1 text-zinc-500"
              onClick={resetToCurrentMonth}
            >
              <RefreshCw size={12} />
              Mese corrente
            </Button>
            <div className="ml-auto">
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs gap-1"
                onClick={exportCsv}
                disabled={exporting || !data}
              >
                <Download size={12} />
                {exporting ? "Esportando…" : "Export CSV"}
              </Button>
            </div>
          </div>
          {data && (
            <p className="text-xs text-zinc-400 mt-3">
              Periodo: <span className="text-zinc-600">{formatDate(data.from)} — {formatDate(data.to)}</span>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Leaderboard table */}
      <Card className="border border-zinc-200 shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-xs font-medium text-zinc-500 uppercase tracking-wide flex items-center gap-2">
            <Trophy size={13} className="text-primary" />
            Classifica dipendenti
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          {loading ? (
            <p className="text-xs text-zinc-400 px-4 py-6 text-center">Caricamento…</p>
          ) : !data || data.rows.length === 0 ? (
            <p className="text-xs text-zinc-400 px-4 py-6 text-center">
              Nessun dato per il periodo selezionato.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="text-left px-4 py-2 text-zinc-400 font-medium w-12">#</th>
                    <th className="text-left px-4 py-2 text-zinc-400 font-medium">Dipendente</th>
                    <th className="text-center px-4 py-2 text-zinc-400 font-medium">Contratti</th>
                    <th className="text-center px-4 py-2 text-zinc-400 font-medium">Moduli</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row) => (
                    <tr
                      key={row.userId}
                      className={`border-b border-zinc-50 hover:bg-zinc-50 ${
                        row.rank === 1 ? "bg-amber-50/40" : ""
                      }`}
                    >
                      <td className="px-4 py-2.5 text-base font-medium text-center">
                        {rankMedal(row.rank)}
                      </td>
                      <td className="px-4 py-2.5 font-medium text-zinc-800">{row.name}</td>
                      <td className="px-4 py-2.5 text-center font-bold text-zinc-800">
                        {row.contractsTotal}
                      </td>
                      <td className="px-4 py-2.5 text-center font-semibold text-zinc-600">
                        {row.modulesTotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
