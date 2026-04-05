import { Router } from "express";
import {
  createJob,
  getApplicantsByJob,
  getRecruiterDashboard,
  getRecruiterJobs,
  updateApplicationStatus
} from "../controllers/recruiterController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate, authorize("RECRUITER"));

router.get("/dashboard", getRecruiterDashboard);
router.get("/jobs", getRecruiterJobs);
router.post("/jobs", createJob);
router.get("/applicants/:jobId", getApplicantsByJob);
router.put("/application/status", updateApplicationStatus);

export default router;
