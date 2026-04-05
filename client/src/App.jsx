import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardRedirect from "./pages/DashboardRedirect";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageRecruitersPage from "./pages/admin/ManageRecruitersPage";
import ManageStudentsPage from "./pages/admin/ManageStudentsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ApplicantsPage from "./pages/recruiter/ApplicantsPage";
import PostJobPage from "./pages/recruiter/PostJobPage";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import ApplicationsPage from "./pages/student/ApplicationsPage";
import JobListingsPage from "./pages/student/JobListingsPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfilePage from "./pages/student/StudentProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardRedirect />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["STUDENT", "RECRUITER", "ADMIN"]} />}>
        <Route element={<DashboardLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfilePage />} />
            <Route path="/student/jobs" element={<JobListingsPage />} />
            <Route path="/student/applications" element={<ApplicationsPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["RECRUITER"]} />}>
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/recruiter/jobs" element={<PostJobPage />} />
            <Route path="/recruiter/applicants" element={<ApplicantsPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<ManageStudentsPage />} />
            <Route path="/admin/recruiters" element={<ManageRecruitersPage />} />
            <Route path="/admin/applications" element={<AdminApplicationsPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
