import mongoose, { type Document, Schema } from "mongoose"

// Define the Job interface
export interface IJob extends Document {
  jobId: any
  title: string
  company: string
  location: string
  job_link: string
  employment_type: string
  experience: string
  source: string
  country: string | ""
  postedDateTime: Date
  companyImageUrl: string
  min_exp: number
  max_exp: number
  seniority_level: string | null
  company_url: string | "Nan"
  company_type: string | null
}

// Create the Job schema
// Create the Job schema
const JobSchema: Schema = new Schema({
  jobId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  job_link: { type: String, required: true },
  employment_type: { type: String, required: true },
  experience: { type: String, required: true },
  source: { type: String, required: true },
  country: { type: String },
  postedDateTime: { type: Date, required: true },
  companyImageUrl: { type: String, required: true },
  min_exp: { type: Number, required: true },
  max_exp: { type: Number, required: true },
  seniority_level: { type: String },
  company_url: { type: String  },
  company_type: { type: String  },
})

// Create and export the Job model
export default mongoose.model<IJob>("Job", JobSchema)
