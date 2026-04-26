import { useHrAuth } from "@/contexts/HrAuthContext";
import { HrLayout } from "@/components/hr/HrLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/hr/admin/OverviewTab";
import { EmployeesTab } from "@/components/hr/admin/EmployeesTab";
import { AttendanceTab } from "@/components/hr/admin/AttendanceTab";
import { VacationsTab } from "@/components/hr/admin/VacationsTab";
import { PerformanceTab } from "@/components/hr/admin/PerformanceTab";

export default function HrAdmin() {
  const { user } = useHrAuth();

  return (
    <HrLayout isAdmin>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-serif text-zinc-800">
            Dashboard Admin
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Benvenuto, <span className="text-zinc-600">{user?.name ?? "—"}</span>
          </p>
        </div>

        <Tabs defaultValue="panoramica">
          <TabsList className="bg-zinc-100 mb-4">
            <TabsTrigger value="panoramica" className="text-xs">Panoramica</TabsTrigger>
            <TabsTrigger value="dipendenti" className="text-xs">Dipendenti</TabsTrigger>
            <TabsTrigger value="presenze" className="text-xs">Presenze</TabsTrigger>
            <TabsTrigger value="ferie" className="text-xs">Ferie</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="panoramica">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="dipendenti">
            <EmployeesTab />
          </TabsContent>
          <TabsContent value="presenze">
            <AttendanceTab />
          </TabsContent>
          <TabsContent value="ferie">
            <VacationsTab />
          </TabsContent>
          <TabsContent value="performance">
            <PerformanceTab />
          </TabsContent>
        </Tabs>
      </div>
    </HrLayout>
  );
}
