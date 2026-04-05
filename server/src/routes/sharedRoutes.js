import { Router } from "express";
import { getJobs, applyForJob, getApplications } from "../controllers/studentController.js";
import { createJob, getApplicantsByJob, updateApplicationStatus } from "../controllers/recruiterController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/jobs", authenticate, authorize("STUDENT"), getJobs);
router.post("/jobs", authenticate, authorize("RECRUITER"), createJob);
router.post("/apply/:jobId", authenticate, authorize("STUDENT"), applyForJob);
router.get("/applications", authenticate, authorize("STUDENT"), getApplications);
router.get("/applicants/:jobId", authenticate, authorize("RECRUITER"), getApplicantsByJob);
router.put("/application/status", authenticate, authorize("RECRUITER"), updateApplicationStatus);

export default router;
