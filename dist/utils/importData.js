"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const database_1 = require("../config/database");
const Job_1 = __importDefault(require("../models/Job"));
// Function to import data from JSON file to MongoDB
const importData = async () => {
    try {
        // Connect to MongoDB
        await (0, database_1.connectDB)();
        // Read JSON file
        const jsonPath = path_1.default.resolve(__dirname, "../../data/jobs.json");
        const jsonData = JSON.parse(fs_1.default.readFileSync(jsonPath, "utf-8"));
        // Transform data to match our schema
        const jobsData = Array.isArray(jsonData) ? jsonData : [jsonData];
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
        }));
        // Clear existing data
        await Job_1.default.deleteMany({});
        // Insert new data
        await Job_1.default.insertMany(transformedData);
        console.log("Data imported successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("Error importing data:", error);
        process.exit(1);
    }
};
exports.importData = importData;
