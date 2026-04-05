import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navigationByRole = {
  STUDENT: [
    { to: "/student", label: "Overview" },
    { to: "/student/profile", label: "Profile" },
    { to: "/student/jobs", label: "Job Listings" },
    { to: "/student/applications", label: "Applications" }
  ],
  RECRUITER: [
    { to: "/recruiter", label: "Overview" },
    { to: "/recruiter/jobs", label: "Post Jobs" },
    { to: "/recruiter/applicants", label: "Applicants" }
  ],
  ADMIN: [
    { to: "/admin", label: "Overview" },
    { to: "/admin/students", label: "Students" },
    { to: "/admin/recruiters", label: "Recruiters" },
    { to: "/admin/applications", label: "Applications" }
  ]
};

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const items = navigationByRole[user?.role] || [];

  return (
    <aside className="flex h-full w-full flex-col rounded-[2rem] bg-ink px-6 py-8 text-white shadow-soft lg:w-72">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-200">CPMS</p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight">Campus Placement Management System</h1>
      </div>

      <div className="mt-10 rounded-3xl bg-white/10 p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Signed in as</p>
        <h2 className="mt-2 text-lg font-semibold">{user?.name}</h2>
        <p className="text-sm text-slate-300">{user?.email}</p>
        <span className="mt-3 inline-flex rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-100">
          {user?.role}
        </span>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-3 text-sm font-medium ${
                isActive ? "bg-brand-500 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
      >
        Logout
      </button>
    </aside>
  );
}
