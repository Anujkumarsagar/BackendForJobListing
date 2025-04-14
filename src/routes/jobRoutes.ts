import express from "express"
import { getAllJobs, filterJobsByLocation } from "../controllers/jobController"

const router = express.Router()

// Define routes
router.get("/", getAllJobs)
router.get("/filter", filterJobsByLocation)

export default router
