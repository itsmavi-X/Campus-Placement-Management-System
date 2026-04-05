import { useEffect, useState } from "react";
import api from "../../api/axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";

export default function RecruiterDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      const { data } = await api.get("/recruiter/dashboard");
      setStats(data.stats);
    }

    fetchDashboard();
  }, []);

  if (!stats) {
    return <LoadingSpinner label="Loading recruiter metrics..." />;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Recruiter Dashboard"
        title="Manage openings and hiring progress"
        description="Track the roles you posted and how applications are moving."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Jobs Posted" value={stats.jobsPosted} />
        <StatCard label="Applications" value={stats.applicationsReceived} tone="slate" />
        <StatCard label="Shortlisted" value={stats.shortlisted} tone="amber" />
        <StatCard label="Selected" value={stats.selected} tone="emerald" />
      </div>
    </div>
  );
}
