import mongoose, { Model, type InferSchemaType } from "mongoose";
import { APPLICATION_STATUS } from "../constants/applicationStatus.js";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.PENDING,
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index(
  {
    job: 1,
    student: 1,
  },
  {
    unique: true,
  }
);

export type ApplicationDocument = InferSchemaType<typeof applicationSchema>;

export interface ApplicationModel extends Model<ApplicationDocument> {}

const Application = mongoose.model<ApplicationDocument, ApplicationModel>(
  "Application",
  applicationSchema
);

export default Application;