import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";

const initialForm = {
  role: "",
  cgpaRequired: "",
  package: "",
  location: "",
  description: ""
};

export default function PostJobPage() {
  const [form, setForm] = useState(initialForm);
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function fetchJobs() {
    const { data } = await api.get("/recruiter/jobs");
    setJobs(data.jobs);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const { data } = await api.post("/recruiter/jobs", form);
      setMessage(data.message);
      setForm(initialForm);
      fetchJobs();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create job.");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Jobs"
        title="Publish a new opportunity"
        description="Define the role, eligibility, package, and location so students can apply."
      />

      <form className="card space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
            <input value={form.role} onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Minimum CGPA</label>
            <input
              type="number"
              step="0.01"
              value={form.cgpaRequired}
              onChange={(event) => setForm((prev) => ({ ...prev, cgpaRequired: event.target.value }))}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Package</label>
            <input value={form.package} onChange={(event) => setForm((prev) => ({ ...prev, package: event.target.value }))} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
            <input value={form.location} onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))} required />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
          <textarea rows="4" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} />
        </div>

        {message ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}

        <button type="submit" className="btn-primary">
          Post Job
        </button>
      </form>

      {jobs.length === 0 ? (
        <EmptyState title="No jobs posted yet" description="Your posted jobs will appear here with application counts." />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {jobs.map((job) => (
            <div key={job.id} className="card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{job.name}</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">{job.role}</h3>
              <p className="mt-2 text-sm text-slate-500">{job.location}</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Package</p>
                  <p className="mt-2 font-semibold text-slate-900">{job.package}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">CGPA</p>
                  <p className="mt-2 font-semibold text-slate-900">{job.cgpaRequired}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Applicants</p>
                  <p className="mt-2 font-semibold text-slate-900">{job._count.applications}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
