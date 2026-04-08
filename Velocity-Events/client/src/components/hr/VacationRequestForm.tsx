import { useState } from "react";
import { hrFetch } from "@/lib/hrAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Palmtree } from "lucide-react";

interface VacationRequestFormProps {
  onSubmitted?: () => void;
}

export function VacationRequestForm({ onSubmitted }: VacationRequestFormProps) {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!startDate || !endDate) {
      setError("Inserisci le date di inizio e fine.");
      return;
    }
    if (startDate >= endDate) {
      setError("La data di inizio deve essere precedente alla data di fine.");
      return;
    }
    if (startDate < todayStr) {
      setError("La data di inizio non può essere nel passato.");
      return;
    }

    setLoading(true);
    try {
      const res = await hrFetch("/api/hr/vacations", {
        method: "POST",
        body: JSON.stringify({ startDate, endDate, reason: reason || undefined }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 201) {
        toast({
          title: "Richiesta inviata",
          description: "La tua richiesta di ferie è stata inviata con successo.",
        });
        setStartDate("");
        setEndDate("");
        setReason("");
        onSubmitted?.();
      } else {
        setError(data.message ?? "Errore nell'invio della richiesta.");
      }
    } catch {
      setError("Errore di connessione.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-zinc-800">
          <Palmtree size={16} className="text-primary" />
          Richiesta Ferie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Data inizio *</label>
              <input
                type="date"
                value={startDate}
                min={todayStr}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Data fine *</label>
              <input
                type="date"
                value={endDate}
                min={startDate || todayStr}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Motivo (facoltativo)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              placeholder="Es. Vacanza estiva, impegni personali..."
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white resize-none"
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
          >
            {loading ? "Invio in corso..." : "Invia Richiesta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
