import { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/PageHeader";

const initialState = {
  name: "",
  email: "",
  phone: "",
  branch: "",
  cgpa: "",
  skills: ""
};

export default function StudentProfilePage() {
  const [form, setForm] = useState(initialState);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await api.get("/student/profile");
      const profile = data.student;
      setForm({
        name: profile.user.name || "",
        email: profile.user.email || "",
        phone: profile.phone || "",
        branch: profile.branch || "",
        cgpa: profile.cgpa ?? "",
        skills: profile.skills || ""
      });
      setResume(profile.resume || null);
    }

    fetchProfile();
  }, []);

  async function handleSave(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const { data } = await api.put("/student/profile", form);
      setMessage(data.message);
      setResume(data.student.resume || resume);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update profile.");
    }
  }

  async function handleResumeUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setMessage("");
    setError("");

    try {
      const { data } = await api.post("/student/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setResume(data.resume);
      setMessage(data.message);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to upload resume.");
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title="Build a strong student profile"
        description="Keep your academic details and resume current so you can apply quickly."
      />

      <form className="card space-y-5" onSubmit={handleSave}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
            <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
            <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Branch</label>
            <input value={form.branch} onChange={(event) => setForm((prev) => ({ ...prev, branch: event.target.value }))} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">CGPA</label>
            <input type="number" step="0.01" value={form.cgpa} onChange={(event) => setForm((prev) => ({ ...prev, cgpa: event.target.value }))} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Resume</label>
            <input type="file" accept="application/pdf" onChange={handleResumeUpload} />
            {resume ? (
              <a
                href={`${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}${resume}`}
                className="mt-2 inline-block text-sm font-medium text-brand-700"
                target="_blank"
                rel="noreferrer"
              >
                View current resume
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Skills</label>
          <textarea
            rows="5"
            value={form.skills}
            onChange={(event) => setForm((prev) => ({ ...prev, skills: event.target.value }))}
            placeholder="React, Node.js, SQL, Data Structures..."
          />
        </div>

        {message ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}

        <button type="submit" className="btn-primary">
          Save Profile
        </button>
      </form>
    </div>
  );
}
