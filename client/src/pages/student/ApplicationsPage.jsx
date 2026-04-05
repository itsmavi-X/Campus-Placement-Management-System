import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      const { data } = await api.get("/student/applications");
      setApplications(data.applications);
    }

    fetchApplications();
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Tracking"
        title="Follow every application outcome"
        description="Stay updated as recruiters move your application through each stage."
      />

      {applications.length === 0 ? (
        <EmptyState title="No applications yet" description="Your submitted applications will appear here." />
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application.id} className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{application.company.name}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{application.company.role}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {application.company.location} • {application.company.package}
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 md:items-end">
                <StatusBadge status={application.status} />
                <p className="text-sm text-slate-500">Applied on {new Date(application.appliedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
