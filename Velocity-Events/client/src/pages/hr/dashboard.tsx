import { useState } from "react";
import { useHrAuth } from "@/contexts/HrAuthContext";
import { HrLayout } from "@/components/hr/HrLayout";
import { AttendanceWidget } from "@/components/hr/AttendanceWidget";
import { VacationRequestForm } from "@/components/hr/VacationRequestForm";
import { PersonalHistory } from "@/components/hr/PersonalHistory";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function HrDashboard() {
  const { user } = useHrAuth();
  const [vacationOpen, setVacationOpen] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);

  const today = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleVacationSubmitted = () => {
    setHistoryKey((k) => k + 1);
    setVacationOpen(false);
  };

  return (
    <HrLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-serif text-zinc-800">
            Benvenuto, <span className="text-primary">{user?.name ?? "—"}</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 capitalize">{today}</p>
        </div>

        <AttendanceWidget />

        <Collapsible open={vacationOpen} onOpenChange={setVacationOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left px-4 py-3 bg-white border border-zinc-200 rounded shadow-sm hover:bg-zinc-50 transition-colors">
            <span className="text-sm font-medium text-zinc-700">Richiedi Ferie</span>
            <ChevronDown
              size={16}
              className={`ml-auto text-zinc-400 transition-transform duration-200 ${vacationOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2">
              <VacationRequestForm onSubmitted={handleVacationSubmitted} />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <PersonalHistory refreshKey={historyKey} />
      </div>
    </HrLayout>
  );
}
