import express from "express";
import Candidate from "../models/Candidate.js";

const router = express.Router();
router.post("/", async (req, res, next) => {
  try {
    const doc = await Candidate.create(req.body);
    req.io.emit("dataUpdated");
    res.status(201).json(doc);
  } catch (e) { next(e); }
});

router.get("/", async (req, res, next) => {
  try {
    const { role, stage, q, minExp, maxExp } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (stage) filter.stage = stage;
    if (minExp) filter.experienceYears = { ...(filter.experienceYears||{}), $gte: Number(minExp) };
    if (maxExp) filter.experienceYears = { ...(filter.experienceYears||{}), $lte: Number(maxExp) };
    if (q) filter.name = { $regex: q, $options: "i" };
    const docs = await Candidate.find(filter).sort({ createdAt: -1 });
    res.json(docs);
  } catch (e) { next(e); }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const doc = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    req.io.emit("dataUpdated");
    res.json(doc);
  } catch (e) { next(e); }
});

router.patch("/:id/stage", async (req, res, next) => {
  try {
    const { stage } = req.body;
    const doc = await Candidate.findByIdAndUpdate(req.params.id, { stage }, { new: true });
    req.io.emit("dataUpdated");
    res.json(doc);
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    req.io.emit("dataUpdated");
    res.status(204).end();
  } catch (e) { next(e); }
});

export default router;
