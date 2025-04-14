import express, { type Application } from "express"
import cors from "cors"
import { connectDB } from "./config/database"
import jobRoutes from "./routes/jobRoutes"
import { importData } from "./utils/importData"

// Initialize express app
const app: Application = express()
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/jobs", jobRoutes)
// importData()

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
