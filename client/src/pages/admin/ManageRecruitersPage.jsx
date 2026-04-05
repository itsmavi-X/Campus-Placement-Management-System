import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";

export default function ManageRecruitersPage() {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    async function fetchRecruiters() {
      const { data } = await api.get("/admin/recruiters");
      setRecruiters(data.recruiters);
    }

    fetchRecruiters();
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Manage recruiter accounts"
        description="See which recruiters are active and how many openings they have posted."
      />

      {recruiters.length === 0 ? (
        <EmptyState title="No recruiters found" description="Recruiter accounts will appear here once created." />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {recruiters.map((recruiter) => (
            <div key={recruiter.id} className="card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{recruiter.companyName}</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">{recruiter.user.name}</h3>
              <p className="mt-2 text-sm text-slate-500">{recruiter.user.email}</p>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Jobs Posted</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{recruiter._count.jobs}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
