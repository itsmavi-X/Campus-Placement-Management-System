import { Router } from "express";
import {
  getAdminDashboard,
  getAllApplications,
  getRecruiters,
  getStudents
} from "../controllers/adminController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate, authorize("ADMIN"));

router.get("/students", getStudents);
router.get("/recruiters", getRecruiters);
router.get("/dashboard", getAdminDashboard);
router.get("/applications", getAllApplications);

export default router;
