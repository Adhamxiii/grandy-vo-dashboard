import DashboardSidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
