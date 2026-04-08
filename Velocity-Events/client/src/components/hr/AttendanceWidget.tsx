import { useEffect, useState } from "react";
import { hrFetch } from "@/lib/hrAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, LogIn, LogOut } from "lucide-react";

interface AttendanceRecord {
  id: number;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
}

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
}

export function AttendanceWidget() {
  const [record, setRecord] = useState<AttendanceRecord | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);

  const fetchToday = async () => {
    setLoading(true);
    try {
      const res = await hrFetch("/api/hr/attendance/today");
      if (res.ok) {
        const data = await res.json();
        setRecord(data && data.id ? data : null);
      } else {
        setRecord(null);
      }
    } catch {
      setRecord(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToday();
  }, []);

  const checkIn = async () => {
    setActing(true);
    try {
      await hrFetch("/api/hr/attendance/checkin", { method: "POST" });
      await fetchToday();
    } finally {
      setActing(false);
    }
  };

  const checkOut = async () => {
    setActing(true);
    try {
      await hrFetch("/api/hr/attendance/checkout", { method: "POST" });
      await fetchToday();
    } finally {
      setActing(false);
    }
  };

  const today = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isCheckedIn = !!record?.checkIn;
  const isCheckedOut = !!record?.checkOut;
  const isFullyClocked = isCheckedIn && isCheckedOut;

  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-zinc-800">
          <Clock size={16} className="text-primary" />
          Presenze Oggi
        </CardTitle>
        <p className="text-xs text-zinc-500 capitalize">{today}</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-10 animate-pulse bg-zinc-100 rounded" />
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-xs text-zinc-400 mb-0.5">Entrata</p>
                <p className="font-medium text-zinc-800">{isCheckedIn ? formatTime(record!.checkIn) : "—"}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-0.5">Uscita</p>
                <p className="font-medium text-zinc-800">{isCheckedOut ? formatTime(record!.checkOut) : "—"}</p>
              </div>
            </div>
            <div className="sm:ml-auto">
              {isFullyClocked ? (
                <p className="text-xs text-zinc-400 italic">Turno completato</p>
              ) : !isCheckedIn ? (
                <Button
                  onClick={checkIn}
                  disabled={acting}
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <LogIn size={15} />
                  Timbra Entrata
                </Button>
              ) : (
                <Button
                  onClick={checkOut}
                  disabled={acting}
                  variant="outline"
                  className="gap-2 border-primary text-primary hover:bg-primary/5"
                >
                  <LogOut size={15} />
                  Timbra Uscita
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
