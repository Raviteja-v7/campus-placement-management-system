import mongoose, {
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
    eligibleBranches: {
      type: [String],
      default: [],
    },
    minimumCGPA: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    deadline: {
  type: String,
  required: true,
},
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type IJob = InferSchemaType<typeof jobSchema>;

export type JobDocument = HydratedDocument<IJob>;

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;