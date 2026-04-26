import { useEffect, useState, useCallback } from "react";
import { hrFetch } from "@/lib/hrAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Plus, Search } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employee";
  status: "active" | "inactive";
  createdAt: string;
}

function NewEmployeeModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"employee" | "admin">("employee");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => { setName(""); setEmail(""); setPassword(""); setRole("employee"); setError(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await hrFetch("/api/hr/employees", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 201) {
        toast({ title: "Dipendente creato", description: `${name} aggiunto con successo.` });
        reset();
        onCreated();
        onClose();
      } else {
        setError(data.message ?? "Errore nella creazione");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onClose(); } }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-serif">Nuovo Dipendente</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Nome *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Mario Rossi"
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="mario@azienda.it"
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Password temporanea *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Ruolo *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "employee" | "admin")}
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white"
            >
              <option value="employee">Dipendente</option>
              <option value="admin">Amministratore</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={() => { reset(); onClose(); }} className="flex-1 text-xs">
              Annulla
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-primary text-primary-foreground text-xs">
              {loading ? "Creazione..." : "Crea"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ResetPasswordModal({
  employee,
  onClose,
}: {
  employee: Employee | null;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    setError("");
    setLoading(true);
    try {
      const res = await hrFetch(`/api/hr/employees/${employee.id}`, {
        method: "PATCH",
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast({ title: "Password aggiornata", description: `Password di ${employee.name} reimpostata.` });
        setPassword("");
        onClose();
      } else {
        setError(data.message ?? "Errore");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!employee} onOpenChange={(v) => { if (!v) { setPassword(""); setError(""); onClose(); } }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-serif">Reimposta Password</DialogTitle>
        </DialogHeader>
        {employee && (
          <form onSubmit={handleSubmit} className="space-y-3 mt-2">
            <p className="text-xs text-zinc-500">Dipendente: <strong>{employee.name}</strong></p>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Nuova password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary"
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div className="flex gap-2 pt-1">
              <Button type="button" variant="ghost" onClick={() => { setPassword(""); setError(""); onClose(); }} className="flex-1 text-xs">
                Annulla
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-primary text-primary-foreground text-xs">
                {loading ? "Salvataggio..." : "Salva"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function EmployeesTab() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [resetTarget, setResetTarget] = useState<Employee | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await hrFetch("/api/hr/employees");
      if (res.ok) setEmployees(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleStatus = async (emp: Employee) => {
    const newStatus = emp.status === "active" ? "inactive" : "active";
    const res = await hrFetch(`/api/hr/employees/${emp.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setEmployees((prev) => prev.map((e) => e.id === emp.id ? { ...e, status: newStatus } : e));
      toast({ title: newStatus === "active" ? "Riattivato" : "Disattivato", description: emp.name });
    } else {
      toast({ title: "Errore", description: "Impossibile aggiornare lo stato", variant: "destructive" });
    }
  };

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca per nome o email..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:border-primary bg-white"
          />
        </div>
        <Button
          onClick={() => setNewOpen(true)}
          className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
        >
          <Plus size={14} />
          Nuovo Dipendente
        </Button>
      </div>

      {loading ? (
        <div className="h-32 animate-pulse bg-zinc-100 rounded" />
      ) : filtered.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center py-6">
          {search ? "Nessun dipendente trovato." : "Nessun dipendente registrato."}
        </p>
      ) : (
        <div className="overflow-x-auto bg-white border border-zinc-200 rounded">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Nome</th>
                <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Email</th>
                <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Ruolo</th>
                <th className="text-left text-xs text-zinc-400 font-medium px-4 py-3">Stato</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 text-zinc-800 font-medium">{emp.name}</td>
                  <td className="px-4 py-3 text-zinc-500 text-xs">{emp.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-zinc-400 capitalize">{emp.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        emp.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-100"
                      }
                    >
                      {emp.status === "active" ? "Attivo" : "Inattivo"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-zinc-400">
                          <MoreHorizontal size={15} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-sm">
                        <DropdownMenuItem onClick={() => toggleStatus(emp)}>
                          {emp.status === "active" ? "Disattiva" : "Riattiva"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setResetTarget(emp)}>
                          Reimposta Password
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NewEmployeeModal open={newOpen} onClose={() => setNewOpen(false)} onCreated={load} />
      <ResetPasswordModal employee={resetTarget} onClose={() => setResetTarget(null)} />
    </div>
  );
}
