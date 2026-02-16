import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirement: [
      {
        type: String,
        required: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdOn: {
      type: Date,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["internship", "full-time", "part-time"],
      required: true,
    },
    workMode: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["fresher", "entry-level", "experienced"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Job = mongoose.model("Job", jobSchema);
