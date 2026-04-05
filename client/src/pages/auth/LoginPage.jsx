import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr,0.95fr]">
      <section className="hidden bg-[linear-gradient(160deg,_#082f49,_#134e4a_55%,_#1e997d)] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="w-fit rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80">Placement Ready</div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-100">Campus Placement Management System</p>
          <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-tight">Coordinate students, recruiters, and hiring decisions from one calm workflow.</h1>
          <p className="mt-6 max-w-lg text-base text-slate-100">
            Built for placement cells that need clarity across profiles, applications, jobs, and status updates.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {["JWT Auth", "Role Dashboards", "Resume Uploads"].map((item) => (
            <div key={item} className="rounded-3xl bg-white/10 p-4 text-sm font-medium backdrop-blur">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md card">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Welcome Back</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Sign in</h2>
          <p className="mt-2 text-sm text-slate-500">Use your account to access the dashboard for your role.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                required
              />
            </div>

            {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            New here?{" "}
            <Link to="/register" className="font-semibold text-brand-700">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
