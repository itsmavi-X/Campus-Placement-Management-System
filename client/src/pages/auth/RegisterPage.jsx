import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "STUDENT",
  companyName: ""
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        companyName: form.role === "RECRUITER" ? form.companyName : undefined
      };
      const { data } = await api.post("/auth/register", payload);
      login(data);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to register.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(30,153,125,0.16),_transparent_35%),linear-gradient(180deg,_#f8fafc,_#eef6f4)] px-6 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[0.9fr,1.1fr]">
        <section className="bg-ink p-10 text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Start Here</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight">Create a placement portal account that matches your role.</h1>
          <p className="mt-4 text-sm text-slate-300">
            Students can complete profiles and apply. Recruiters can post roles and evaluate applicants.
          </p>
        </section>

        <section className="p-8 md:p-10">
          <h2 className="text-3xl font-semibold text-slate-900">Register</h2>
          <p className="mt-2 text-sm text-slate-500">Choose the right role so the correct dashboard is provisioned for you.</p>

          <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                minLength="6"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
              <select value={form.role} onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}>
                <option value="STUDENT">Student</option>
                <option value="RECRUITER">Recruiter</option>
              </select>
            </div>

            {form.role === "RECRUITER" ? (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Company name</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(event) => setForm((prev) => ({ ...prev, companyName: event.target.value }))}
                  required
                />
              </div>
            ) : null}

            {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600 md:col-span-2">{error}</p> : null}

            <button type="submit" className="btn-primary md:col-span-2" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand-700">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
