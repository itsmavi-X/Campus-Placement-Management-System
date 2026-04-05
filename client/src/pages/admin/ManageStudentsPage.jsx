import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";

export default function ManageStudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const { data } = await api.get("/admin/students");
      setStudents(data.students);
    }

    fetchStudents();
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Manage student records"
        description="Review student profiles, academics, and application activity."
      />

      {students.length === 0 ? (
        <EmptyState title="No students found" description="Student accounts will appear here once created." />
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Branch</th>
                  <th className="px-6 py-4">CGPA</th>
                  <th className="px-6 py-4">Applications</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-medium text-slate-900">{student.user.name}</td>
                    <td className="px-6 py-4 text-slate-600">{student.user.email}</td>
                    <td className="px-6 py-4 text-slate-600">{student.branch || "N/A"}</td>
                    <td className="px-6 py-4 text-slate-600">{student.cgpa ?? "N/A"}</td>
                    <td className="px-6 py-4 text-slate-600">{student._count.applications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
