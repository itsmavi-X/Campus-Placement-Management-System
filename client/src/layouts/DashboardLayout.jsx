import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(30,153,125,0.16),_transparent_30%),linear-gradient(180deg,_#f8fafc,_#eef6f4)] p-4 lg:p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[18rem,1fr]">
        <Sidebar />
        <main className="rounded-[2rem] bg-white/60 p-4 backdrop-blur md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
