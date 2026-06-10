import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Study Buddy - Smart Learning Assistant",
  description: "AI-powered study assistant for better learning outcomes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden bg-gray-950">
          <AppSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <AppHeader />
            <main className="flex-1 overflow-y-auto bg-gray-950 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
