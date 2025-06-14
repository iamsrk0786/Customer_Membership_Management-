import express from "express";
import {
  getAllMemberships,
  addMembership,
  updateMembership,
  deleteMembership,
} from "../controllers/membershipController.js";

const router = express.Router();

router.get("/", getAllMemberships);
router.post("/add", addMembership);
router.put("/update/:id", updateMembership);
router.delete("/delete/:id", deleteMembership);

export default router;
