import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import JobForm, {
  type JobFormValues,
} from "../../components/admin/JobForm";

import { createJob } from "../../api/jobApi";
import { ROUTES } from "../../constants/routes";

const initialValues: JobFormValues = {
  title: "",
  company: "",
  location: "",
  salary: "",
  minimumCGPA: "",
  deadline: new Date().toISOString().split("T")[0],
  description: "",
  requirements: "",
  skillsRequired: "",
  eligibleBranches: "",
};

const CreateJob = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: JobFormValues
  ) => {
    try {
      await createJob({
        title: values.title,
        company: values.company,
        location: values.location,
        salary: Number(values.salary),
        minimumCGPA: Number(values.minimumCGPA),
        deadline: values.deadline,
        description: values.description,

        requirements: values.requirements
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        skillsRequired: values.skillsRequired
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        eligibleBranches: values.eligibleBranches
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      toast.success("Job created successfully");

      navigate(ROUTES.ADMIN.JOBS);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Failed to create job"
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Create New Job
        </h1>

        <p className="mt-2 text-gray-500">
          Fill in the job details below.
        </p>
      </div>

      <div className="rounded-xl bg-white p-8 shadow">
        <JobForm
          initialValues={initialValues}
          submitText="Create Job"
          onSubmit={handleSubmit}
          onCancel={() =>
            navigate(ROUTES.ADMIN.JOBS)
          }
        />
      </div>
    </div>
  );
};

export default CreateJob;