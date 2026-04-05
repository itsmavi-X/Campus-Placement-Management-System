import { useEffect, useState } from "react";
import api from "../../api/axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      const { data } = await api.get("/student/dashboard");
      setStats(data.stats);
    }

    fetchDashboard();
  }, []);

  if (!stats) {
    return <LoadingSpinner label="Loading student insights..." />;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Student Dashboard"
        title="Track opportunities and your placement momentum"
        description="Monitor active jobs, applications, and outcomes from one place."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open Jobs" value={stats.totalJobs} />
        <StatCard label="Applications" value={stats.totalApplications} tone="slate" />
        <StatCard label="Shortlisted" value={stats.shortlisted} tone="amber" />
        <StatCard label="Selected" value={stats.selected} tone="emerald" />
      </div>
    </div>
  );
}
