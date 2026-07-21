import { Schema, model, type InferSchemaType } from "mongoose";

const studentProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    avatarUrl: {
      type: String,
      default: "",
    },

    resumeUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export type IStudentProfile = InferSchemaType<typeof studentProfileSchema>;

export const StudentProfile = model<IStudentProfile>(
  "StudentProfile",
  studentProfileSchema,
);