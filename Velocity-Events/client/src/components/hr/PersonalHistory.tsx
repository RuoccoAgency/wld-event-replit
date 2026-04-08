import { useEffect, useState, useCallback } from "react";
import { hrFetch } from "@/lib/hrAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

interface AttendanceRecord {
  id: number;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
}

interface VacationRecord {
  id: number;
  startDate: string;
  endDate: string;
  reason: string | null;
  status: "pending" | "approved" | "rejected";
}

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "In attesa",
  approved: "Approvata",
  rejected: "Rifiutata",
};

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
};

function AttendanceTab({ refreshKey }: { refreshKey: number }) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (nextPage: number, append: boolean) => {
    setLoading(true);
    try {
      const res = await hrFetch(`/api/hr/attendance/history?page=${nextPage}&limit=10`);
      if (!res.ok) return;
      const data = await res.json();
      const items: AttendanceRecord[] = data.records ?? data;
      setRecords((prev) => append ? [...prev, ...items] : items);
      setHasMore(items.length === 10);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(1, false);
  }, [load, refreshKey]);

  return (
    <div className="space-y-3">
      {records.length === 0 && !loading ? (
        <p className="text-sm text-zinc-400 py-4 text-center">Nessun registro trovato.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left text-xs text-zinc-400 font-medium pb-2 pr-4">Data</th>
                <th className="text-left text-xs text-zinc-400 font-medium pb-2 pr-4">Entrata</th>
                <th className="text-left text-xs text-zinc-400 font-medium pb-2">Uscita</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="py-2.5 pr-4 text-zinc-700">{formatDate(r.date)}</td>
                  <td className="py-2.5 pr-4 text-zinc-600">{formatTime(r.checkIn)}</td>
                  <td className="py-2.5 text-zinc-600">{formatTime(r.checkOut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {hasMore && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => load(page + 1, true)}
          disabled={loading}
          className="text-xs text-zinc-500"
        >
          {loading ? "Caricamento..." : "Carica altri"}
        </Button>
      )}
    </div>
  );
}

function VacationsTab({ refreshKey }: { refreshKey: number }) {
  const [records, setRecords] = useState<VacationRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await hrFetch("/api/hr/vacations/mine");
      if (!res.ok) return;
      const data = await res.json();
      setRecords(Array.isArray(data) ? data : (data.records ?? []));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  return (
    <div className="space-y-3">
      {records.length === 0 && !loading ? (
        <p className="text-sm text-zinc-400 py-4 text-center">Nessuna richiesta trovata.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left text-xs text-zinc-400 font-medium pb-2 pr-4">Periodo</th>
                <th className="text-left text-xs text-zinc-400 font-medium pb-2 pr-4">Motivo</th>
                <th className="text-left text-xs text-zinc-400 font-medium pb-2">Stato</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="py-2.5 pr-4 text-zinc-700 whitespace-nowrap">
                    {formatDate(r.startDate)} – {formatDate(r.endDate)}
                  </td>
                  <td className="py-2.5 pr-4 text-zinc-500 text-xs max-w-[200px] truncate">
                    {r.reason || "—"}
                  </td>
                  <td className="py-2.5">
                    <Badge
                      variant={STATUS_VARIANTS[r.status]}
                      className={
                        r.status === "pending"
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          : r.status === "approved"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {STATUS_LABELS[r.status]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

interface PersonalHistoryProps {
  refreshKey?: number;
}

export function PersonalHistory({ refreshKey = 0 }: PersonalHistoryProps) {
  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-zinc-800">
          <History size={16} className="text-primary" />
          La Mia Cronologia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presenze">
          <TabsList className="mb-4 bg-zinc-100">
            <TabsTrigger value="presenze" className="text-xs">Presenze</TabsTrigger>
            <TabsTrigger value="ferie" className="text-xs">Ferie</TabsTrigger>
          </TabsList>
          <TabsContent value="presenze">
            <AttendanceTab refreshKey={refreshKey} />
          </TabsContent>
          <TabsContent value="ferie">
            <VacationsTab refreshKey={refreshKey} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
