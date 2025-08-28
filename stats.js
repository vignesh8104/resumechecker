import express from "express";
import Candidate from "../models/Candidate.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const stages = ["Applied","Interview","Offer","Rejected"];
    const countsByStage = Object.fromEntries(await Promise.all(stages.map(async s => [s, await Candidate.countDocuments({ stage: s })])));

    const countsByRoleAgg = await Candidate.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
      { $project: { _id: 0, role: "$_id", count: 1 } },
      { $sort: { count: -1 } }
    ]);

    const avgExpAgg = await Candidate.aggregate([
      { $group: { _id: null, avgExp: { $avg: "$experienceYears" } } }
    ]);

    res.json({
      countsByStage,
      countsByRole: countsByRoleAgg,
      averageExperience: Number((avgExpAgg[0]?.avgExp || 0).toFixed(2))
    });
  } catch (e) { next(e); }
});

export default router;
