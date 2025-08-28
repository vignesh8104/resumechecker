import "dotenv/config";
import mongoose from "mongoose";
import Candidate from "./models/Candidate.js";

const roles = ["Frontend Developer","Backend Developer","Data Scientist","QA Engineer","Product Manager"];
const stages = ["Applied","Interview","Offer","Rejected"];

const random = arr => arr[Math.floor(Math.random()*arr.length)];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  await Candidate.deleteMany({});
  const docs = [];
  for (let i=1; i<=25; i++) {
    docs.push({
      name: `Candidate ${i}`,
      role: random(roles),
      experienceYears: Math.floor(Math.random()*10),
      resumeUrl: "",
      stage: random(stages)
    });
  }
  await Candidate.insertMany(docs);
  console.log("Seeded", docs.length, "candidates");
  await mongoose.disconnect();
}
run().catch(console.error);
