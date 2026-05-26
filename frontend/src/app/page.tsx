import { Sidebar } from "@/components/sidebar/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Dashboard />
      </div>
    </main>
  );
}
