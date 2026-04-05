import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      const { data } = await api.get("/admin/applications");
      setApplications(data.applications);
    }

    fetchApplications();
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Monitor every application"
        description="Track student applications across all companies and statuses."
      />

      {applications.length === 0 ? (
        <EmptyState title="No applications found" description="Submitted applications will appear here." />
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application.id} className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{application.student.user.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {application.company.name} • {application.company.role} • {application.company.location}
                </p>
                <p className="mt-1 text-sm text-slate-500">{application.student.user.email}</p>
              </div>
              <StatusBadge status={application.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
