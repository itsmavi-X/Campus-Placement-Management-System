import { useEffect, useState } from "react";
import api from "../../api/axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      const { data } = await api.get("/admin/dashboard");
      setDashboard(data);
    }

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return <LoadingSpinner label="Loading admin analytics..." />;
  }

  const { stats, recentApplications } = dashboard;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin Dashboard"
        title="Monitor the whole placement ecosystem"
        description="Get a quick read on student participation, recruiter activity, and application outcomes."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Students" value={stats.totalStudents} />
        <StatCard label="Recruiters" value={stats.totalRecruiters} tone="slate" />
        <StatCard label="Jobs" value={stats.totalJobs} tone="amber" />
        <StatCard label="Applications" value={stats.totalApplications} tone="emerald" />
        <StatCard label="Shortlisted" value={stats.shortlisted} tone="amber" />
        <StatCard label="Selected" value={stats.selected} tone="emerald" />
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-slate-900">Recent applications</h3>
        <div className="mt-5 space-y-4">
          {recentApplications.map((application) => (
            <div key={application.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{application.student.user.name}</p>
                <p className="text-sm text-slate-500">
                  {application.company.name} • {application.company.role}
                </p>
              </div>
              <StatusBadge status={application.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
