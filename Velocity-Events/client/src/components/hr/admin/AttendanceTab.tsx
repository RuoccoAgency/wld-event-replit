import { useEffect, useState, useCallback } from "react";
import { hrFetch } from "@/lib/hrAuth";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
}

interface AttendanceRecord {
  id: number;
  userId: number;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  userName: string | null;
  userEmail: string | null;
}

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

const PAGE_SIZE = 20;

export function AttendanceTab() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ employee: "", from: "", to: "" });

  useEffect(() => {
    hrFetch("/api/hr/employees")
      .then((r) => r.json())
      .then((data) => setEmployees(Array.isArray(data) ? data : []));
  }, []);

  const load = useCallback(async (p: number, filters: typeof appliedFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(PAGE_SIZE) });
      if (filters.employee) params.set("userId", filters.employee);
      if (filters.from) params.set("dateFrom", filters.from);
      if (filters.to) params.set("dateTo", filters.to);

      const res = await hrFetch(`/api/hr/attendance/all?${params}`);
      if (!res.ok) return;
      const data = await res.json();
      setRecords(data.records ?? []);
      setTotal(data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(1, { employee: "", from: "", to: "" });
  }, [load]);

  const applyFilters = () => {
    const filters = { employee: filterEmployee, from: filterFrom, to: filterTo };
    setAppliedFilters(filters);
    setPage(1);
    load(1, filters);
  };

  const goToPage = (p: number) => {
    setPage(p);
    load(p, appliedFilters);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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
          <label className="block text-xs text-zinc-400 mb-1">Dal</label>
          <input
            type="date"
            value={filterFrom}
            onChange={(e) => setFilterFrom(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white"
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Al</label>
          <input
            type="date"
            value={filterTo}
            onChange={(e) => setFilterTo(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white"
          />
        </div>
        <Button onClick={applyFilters} className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
          Filtra
        </Button>
      </div>

      {loading ? (
        <div className="h-40 animate-pulse bg-zinc-100 rounded" />
      ) : records.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center py-6">Nessun record trovato.</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white border border-zinc-200 rounded">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-100">
                <tr>
                  <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Dipendente</th>
                  <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Data</th>
                  <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Entrata</th>
                  <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Uscita</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                    <td className="px-4 py-3 text-zinc-700">{r.userName ?? r.userEmail ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-600">{formatDate(r.date)}</td>
                    <td className="px-4 py-3 text-zinc-600">{formatTime(r.checkIn)}</td>
                    <td className="px-4 py-3 text-zinc-600">{formatTime(r.checkOut)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>{total} record totali</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft size={14} />
              </Button>
              <span>Pagina {page} di {totalPages}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="h-7 w-7 p-0"
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
