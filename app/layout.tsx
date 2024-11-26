import DashboardSidebar from "@/components/Sidebar";
import "./globals.css";
import Session from "@/components/providers/Session";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster />
        <div className="flex h-screen overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 bg-white overflow-y-auto">
            <div className="container mx-auto p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
