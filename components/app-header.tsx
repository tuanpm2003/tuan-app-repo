import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search documents, topics, or questions..."
            className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-100">John Doe</div>
            <div className="text-xs text-gray-500">john@example.com</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <span className="text-sm font-semibold text-primary">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
