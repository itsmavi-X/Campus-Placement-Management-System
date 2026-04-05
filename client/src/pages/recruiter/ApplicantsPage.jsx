import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";

const statuses = ["APPLIED", "SHORTLISTED", "REJECTED", "SELECTED"];

export default function ApplicantsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function bootstrap() {
      const { data } = await api.get("/recruiter/jobs");
      setJobs(data.jobs);
      if (data.jobs.length > 0) {
        setSelectedJobId(String(data.jobs[0].id));
      }
    }

    bootstrap();
  }, []);

  useEffect(() => {
    async function fetchApplicants() {
      if (!selectedJobId) {
        setApplicants([]);
        return;
      }

      const { data } = await api.get(`/recruiter/applicants/${selectedJobId}`);
      setApplicants(data.applicants);
    }

    fetchApplicants();
  }, [selectedJobId]);

  async function handleStatusChange(applicationId, status) {
    const { data } = await api.put("/recruiter/application/status", {
      applicationId,
      status
    });

    setMessage(data.message);

    const refreshed = await api.get(`/recruiter/applicants/${selectedJobId}`);
    setApplicants(refreshed.data.applicants);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Applicants"
        title="Review and update candidate outcomes"
        description="Choose a posted role to see applicants and move them through the hiring pipeline."
      />

      {message ? <p className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}

      <div className="card">
        <label className="mb-2 block text-sm font-medium text-slate-700">Select job</label>
        <select value={selectedJobId} onChange={(event) => setSelectedJobId(event.target.value)}>
          <option value="">Choose a job</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.role} - {job.location}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        {!selectedJobId ? (
          <EmptyState title="Select a job" description="Pick one of your posted openings to inspect applicants." />
        ) : applicants.length === 0 ? (
          <EmptyState title="No applicants yet" description="Applications will appear here once students start applying." />
        ) : (
          <div className="space-y-4">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="card">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{applicant.student.user.name}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">{applicant.student.branch || "Branch not set"}</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      {applicant.student.user.email} • CGPA {applicant.student.cgpa ?? "N/A"}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">{applicant.student.skills || "Skills not added yet."}</p>
                    {applicant.student.resume ? (
                      <a
                        href={`${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}${applicant.student.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm font-semibold text-brand-700"
                      >
                        View Resume
                      </a>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end">
                    <StatusBadge status={applicant.status} />
                    <select value={applicant.status} onChange={(event) => handleStatusChange(applicant.id, event.target.value)}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
