import { useEffect, useState } from "react";
import { hrFetch } from "@/lib/hrAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";

interface Stats {
  active: number;
  presentToday: number;
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

export function OverviewTab() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [checkins, setCheckins] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const [statsRes, attendanceRes] = await Promise.all([
        hrFetch("/api/hr/employees/stats"),
        hrFetch(`/api/hr/attendance/all?dateFrom=${today}&dateTo=${today}&limit=100`),
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (attendanceRes.ok) {
        const data = await attendanceRes.json();
        const records: AttendanceRecord[] = data.records ?? [];
        setCheckins(records.sort((a, b) => {
          const ta = a.checkIn ? new Date(a.checkIn).getTime() : 0;
          const tb = b.checkIn ? new Date(b.checkIn).getTime() : 0;
          return ta - tb;
        }));
      }
      setLoading(false);
    };
    load();
  }, []);

  const today = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      <p className="text-xs text-zinc-400 capitalize">{today}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded">
                <Users size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Dipendenti Attivi</p>
                <p className="text-2xl font-semibold text-zinc-800">
                  {loading ? "—" : stats?.active ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded">
                <UserCheck size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Presenti Oggi</p>
                <p className="text-2xl font-semibold text-zinc-800">
                  {loading ? "—" : `${stats?.presentToday ?? 0} / ${stats?.active ?? 0}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-zinc-700">Check-in di Oggi</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-20 animate-pulse bg-zinc-100 rounded" />
          ) : checkins.length === 0 ? (
            <p className="text-sm text-zinc-400 text-center py-4">Nessuna presenza registrata oggi.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="text-left text-xs text-zinc-400 font-medium pb-2 pr-4">Dipendente</th>
                    <th className="text-left text-xs text-zinc-400 font-medium pb-2 pr-4">Entrata</th>
                    <th className="text-left text-xs text-zinc-400 font-medium pb-2">Uscita</th>
                  </tr>
                </thead>
                <tbody>
                  {checkins.map((r) => (
                    <tr key={r.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                      <td className="py-2.5 pr-4 text-zinc-700">{r.userName ?? r.userEmail ?? "—"}</td>
                      <td className="py-2.5 pr-4 text-zinc-600">{formatTime(r.checkIn)}</td>
                      <td className="py-2.5 text-zinc-600">{formatTime(r.checkOut)}</td>
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
