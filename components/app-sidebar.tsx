"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  CreditCard,
  ClipboardCheck,
  TrendingUp,
  Settings,
  Briefcase,
  Swords,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Documents", href: "/documents" },
  { icon: BookOpen, label: "Study", href: "/study/doc-1" },
  { icon: CreditCard, label: "Flashcards", href: "/flashcards" },
  { icon: ClipboardCheck, label: "Quizzes", href: "/quiz/doc-1" },
  { icon: Swords, label: "Quiz Battle", href: "/quiz-battle" },
  { icon: TrendingUp, label: "Progress", href: "/progress" },
  { icon: Briefcase, label: "Management", href: "/management" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-800 bg-gray-900">
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold text-gray-100">AI Study Buddy</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
