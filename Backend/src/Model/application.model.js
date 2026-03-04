import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    fresher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    jobStatus: {
      type: String,
      enum: ["applied", "shortlisted", "interview", "accepted", "rejected"],
      default: "applied",
    },
    feedback: {
      technicalSkills: String,
      communication: String,
      experienceGap: String,
      overallRemark: String,
    },
    matchedSkill: [
      {
        type: String,
      },
    ],
    unmatchedSkill: [
      {
        type: String,
      },
    ],
    matchScore: {
      type: Number,
    },
  },
  { timestamps: true },
);

applicationSchema.index({ job: 1, fresher: 1 }, { unique: true });

export const Application = mongoose.model("application", applicationSchema);
