import fs from "fs"
import path from "path"
import { connectDB } from "../config/database"
import Job from "../models/Job"

// Function to import data from JSON file to MongoDB
export const importData = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB()

    // Read JSON file
    const jsonPath = path.resolve(__dirname, "../../data/jobs.json")
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))

    // Transform data to match our schema
    const jobsData = Array.isArray(jsonData) ? jsonData : [jsonData]
    const transformedData = jobsData.map((job) => ({
      jobId: job["Job ID (Numeric)"]?.["$numberLong"] || job["Job ID (Numeric)"],
      title: job?.title || "Unknown Title",
      company: job?.company || "Unknown Company",
      location: job?.location || "Unknown Location", 
      job_link: job?.job_link || "",
      seniority_level: job?.seniority_level || null, 
      employment_type: job?.employment_type || "Not Specified", 
      experience: job?.experience || "Not Specified", 
      source: job?.source || "Unknown Source", 
      company_url: typeof job?.company_url === 'object' && job.company_url !== null
        ? job.company_url['$numberDouble'] || ""
        : job?.company_url || "", 
      companytype: job?.companytype || null,
      country: job?.country || "",
      postedDateTime: job?.postedDateTime?.$date ? new Date(job?.postedDateTime.$date) : new Date(), // Default to current date
      companyImageUrl: typeof job?.companyImageUrl === 'object' && job.companyImageUrl !== null
        ? job.companyImageUrl['$numberDouble'] || ""
        : job?.companyImageUrl || "",
      min_exp: job?.min_exp || 0,
      max_exp: job?.max_exp || 0,
    }))
    // Clear existing data
    await Job.deleteMany({})

    // Insert new data
    await Job.insertMany(transformedData)

    console.log("Data imported successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error importing data:", error)
    process.exit(1)
  }
}


