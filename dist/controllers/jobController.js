"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterJobsByLocation = exports.getAllJobs = void 0;
const Job_1 = __importDefault(require("../models/Job"));
// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job_1.default.find();
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    }
    catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
exports.getAllJobs = getAllJobs;
// Filter jobs by location
const filterJobsByLocation = async (req, res) => {
    try {
        const location = req.query.location;
        if (!location) {
            res.status(400).json({
                success: false,
                error: "Please provide a location parameter",
            });
            return;
        }
        // Using regex for partial and case-insensitive matching
        const jobs = await Job_1.default.find({
            location: { $regex: location, $options: "i" },
        });
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    }
    catch (error) {
        console.error("Error filtering jobs by location:", error);
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};
exports.filterJobsByLocation = filterJobsByLocation;
