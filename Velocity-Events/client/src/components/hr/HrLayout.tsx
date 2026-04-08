import { useHrAuth } from "@/contexts/HrAuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface HrLayoutProps {
  children: React.ReactNode;
}

export function HrLayout({ children }: HrLayoutProps) {
  const { user, logout } = useHrAuth();

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="bg-white border-b border-zinc-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Wedding Luxury Drive" className="h-8 w-auto" />
            <span className="hidden sm:inline-block text-xs font-serif font-medium tracking-[0.15em] text-zinc-500 uppercase">
              Portale HR
            </span>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-zinc-600 hidden sm:inline">
                {user.name}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-zinc-500 hover:text-zinc-800 gap-1.5"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline text-xs">Esci</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  );
}
