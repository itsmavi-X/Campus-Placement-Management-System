import { Router } from "express";
import {
  applyForJob,
  getApplications,
  getJobs,
  getStudentDashboard,
  getStudentProfile,
  updateStudentProfile,
  uploadStudentResume
} from "../controllers/studentController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import { uploadResume } from "../middleware/uploadMiddleware.js";

const router = Router();

router.use(authenticate, authorize("STUDENT"));

router.get("/profile", getStudentProfile);
router.put("/profile", updateStudentProfile);
router.post("/resume", uploadResume.single("resume"), uploadStudentResume);
router.get("/dashboard", getStudentDashboard);
router.get("/jobs", getJobs);
router.post("/apply/:jobId", applyForJob);
router.get("/applications", getApplications);

export default router;
