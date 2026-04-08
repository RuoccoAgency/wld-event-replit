import { useEffect, useState, useCallback } from "react";
import { hrFetch } from "@/lib/hrAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
}

interface VacationRecord {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  decidedBy: number | null;
  decidedAt: string | null;
  userName: string | null;
  userEmail: string | null;
  decidedByName: string | null;
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const STATUS_LABELS: Record<string, string> = {
  pending: "In attesa",
  approved: "Approvata",
  rejected: "Rifiutata",
};

export function VacationsTab() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<VacationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [deciding, setDeciding] = useState<number | null>(null);

  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ employee: "", status: "" });

  useEffect(() => {
    hrFetch("/api/hr/employees")
      .then((r) => r.json())
      .then((data) => setEmployees(Array.isArray(data) ? data : []));
  }, []);

  const load = useCallback(async (filters: typeof appliedFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.employee) params.set("userId", filters.employee);
      if (filters.status) params.set("status", filters.status);
      const res = await hrFetch(`/api/hr/vacations/all?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load({ employee: "", status: "" });
  }, [load]);

  const applyFilters = () => {
    const filters = { employee: filterEmployee, status: filterStatus };
    setAppliedFilters(filters);
    load(filters);
  };

  const decide = async (id: number, status: "approved" | "rejected") => {
    setDeciding(id);
    try {
      const res = await hrFetch(`/api/hr/vacations/${id}/decide`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
        toast({
          title: status === "approved" ? "Richiesta approvata" : "Richiesta rifiutata",
          description: status === "approved" ? "La ferie è stata approvata." : "La ferie è stata rifiutata.",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        toast({ title: "Errore", description: data.message ?? "Impossibile aggiornare", variant: "destructive" });
      }
    } finally {
      setDeciding(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end bg-white border border-zinc-200 rounded p-4">
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Dipendente</label>
          <select
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white min-w-[160px]"
          >
            <option value="">Tutti</option>
            {employees.map((e) => (
              <option key={e.id} value={String(e.id)}>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Stato</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white min-w-[140px]"
          >
            <option value="">Tutti</option>
            <option value="pending">In attesa</option>
            <option value="approved">Approvate</option>
            <option value="rejected">Rifiutate</option>
          </select>
        </div>
        <Button onClick={applyFilters} className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
          Filtra
        </Button>
      </div>

      {loading ? (
        <div className="h-40 animate-pulse bg-zinc-100 rounded" />
      ) : records.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center py-6">Nessuna richiesta trovata.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-zinc-200 rounded">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Dipendente</th>
                <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Periodo</th>
                <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Motivo</th>
                <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Stato</th>
                <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Deciso da</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 text-zinc-700">{r.userName ?? r.userEmail ?? "—"}</td>
                  <td className="px-4 py-3 text-zinc-600 whitespace-nowrap text-xs">
                    {formatDate(r.startDate)} – {formatDate(r.endDate)}
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs max-w-[180px] truncate">
                    {r.reason || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
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
                  <td className="px-4 py-3 text-xs text-zinc-500">
                    {r.status !== "pending" ? (
                      <div>
                        <p className="font-medium text-zinc-700">{r.decidedByName ?? "—"}</p>
                        <p className="text-zinc-400">{r.decidedAt ? formatDateTime(r.decidedAt) : "—"}</p>
                      </div>
                    ) : (
                      <span className="text-zinc-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {r.status === "pending" && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => decide(r.id, "approved")}
                          disabled={deciding === r.id}
                          className="h-7 px-2 bg-green-600 hover:bg-green-700 text-white gap-1 text-xs"
                        >
                          <Check size={12} />
                          Approva
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => decide(r.id, "rejected")}
                          disabled={deciding === r.id}
                          className="h-7 px-2 border-red-200 text-red-600 hover:bg-red-50 gap-1 text-xs"
                        >
                          <X size={12} />
                          Rifiuta
                        </Button>
                      </div>
                    )}
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
