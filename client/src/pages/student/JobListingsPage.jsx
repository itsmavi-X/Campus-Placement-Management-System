import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";

export default function JobListingsPage() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function fetchJobs() {
    const { data } = await api.get("/student/jobs");
    setJobs(data.jobs);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  async function handleApply(jobId) {
    setMessage("");
    setError("");

    try {
      const { data } = await api.post(`/student/apply/${jobId}`);
      setMessage(data.message);
      fetchJobs();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to submit application.");
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Jobs"
        title="Explore current placement openings"
        description="Browse recruiter postings, compare criteria, and apply directly from this page."
      />

      {message ? <p className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}

      {jobs.length === 0 ? (
        <EmptyState title="No jobs posted yet" description="Recruiters have not published any openings so far." />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {jobs.map((job) => {
            const existingApplication = job.applications?.[0];

            return (
              <div key={job.id} className="card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{job.name}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">{job.role}</h3>
                    <p className="mt-2 text-sm text-slate-500">{job.location}</p>
                  </div>
                  {existingApplication ? <StatusBadge status={existingApplication.status} /> : null}
                </div>

                <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Package</p>
                    <p className="mt-2 font-semibold text-slate-900">{job.package}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Min CGPA</p>
                    <p className="mt-2 font-semibold text-slate-900">{job.cgpaRequired}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Recruiter</p>
                    <p className="mt-2 font-semibold text-slate-900">{job.recruiter?.user?.name}</p>
                  </div>
                </div>

                {job.description ? <p className="mt-5 text-sm leading-6 text-slate-500">{job.description}</p> : null}

                <button
                  type="button"
                  onClick={() => handleApply(job.id)}
                  disabled={Boolean(existingApplication)}
                  className={`mt-6 ${existingApplication ? "btn-secondary cursor-not-allowed opacity-70" : "btn-primary"}`}
                >
                  {existingApplication ? "Already Applied" : "Apply Now"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
