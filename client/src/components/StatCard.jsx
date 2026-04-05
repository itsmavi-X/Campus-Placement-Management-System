export default function StatCard({ label, value, tone = "brand" }) {
  const tones = {
    brand: "from-brand-600 to-brand-400",
    amber: "from-amber-500 to-orange-400",
    slate: "from-slate-800 to-slate-600",
    emerald: "from-emerald-600 to-emerald-400"
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-soft">
      <div className={`h-2 bg-gradient-to-r ${tones[tone] || tones.brand}`} />
      <div className="p-6">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <h3 className="mt-3 text-3xl font-semibold text-slate-900">{value}</h3>
      </div>
    </div>
  );
}
