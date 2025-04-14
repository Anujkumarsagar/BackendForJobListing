import type { Request, Response } from "express"
import Job from "../models/Job"

// Get all jobs
export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find()
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    res.status(500).json({
      success: false,
      error: "Server Error",
    })
  }
}

// Filter jobs by location
export const filterJobsByLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = req.query.location as string

    if (!location) {
      res.status(400).json({
        success: false,
        error: "Please provide a location parameter",
      })
      return
    }

    // Using regex for partial and case-insensitive matching
    const jobs = await Job.find({
      location: { $regex: location, $options: "i" },
    })

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    })
  } catch (error) {
    console.error("Error filtering jobs by location:", error)
    res.status(500).json({
      success: false,
      error: "Server Error",
    })
  }
}
