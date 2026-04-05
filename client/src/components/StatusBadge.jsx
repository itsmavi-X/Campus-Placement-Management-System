const styles = {
  APPLIED: "bg-sky-100 text-sky-700",
  SHORTLISTED: "bg-amber-100 text-amber-700",
  REJECTED: "bg-rose-100 text-rose-700",
  SELECTED: "bg-emerald-100 text-emerald-700"
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}
