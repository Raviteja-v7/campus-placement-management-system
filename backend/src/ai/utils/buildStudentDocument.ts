import { type IStudentProfile } from "../../models/StudentProfile.model.js";

export const buildStudentDocument = (
  profile: IStudentProfile,
  resumeText: string
): string => {
  return `
Department:
${profile.department}

CGPA:
${profile.cgpa}

Skills:
${profile.skills.join(", ")}

Experience:
${profile.experience}

Resume:
${resumeText}
`;
};