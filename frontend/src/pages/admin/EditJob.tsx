import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import JobForm, {
  type JobFormValues,
} from "../../components/admin/JobForm";

import {
  getJob,
  updateJob,
} from "../../api/jobApi";

import { ROUTES } from "../../constants/routes";
import Loader from "../../components/common/Loader";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [initialValues, setInitialValues] =
    useState<JobFormValues | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!id) return;

        const response = await getJob(id);
        const job = response.data;

        /*
         * The date input requires:
         * YYYY-MM-DD
         *
         * This handles both:
         * "2026-08-10"
         * and
         * "2026-08-10T00:00:00.000Z"
         */
        const deadline =
          typeof job.deadline === "string"
            ? job.deadline.split("T")[0]
            : "";

        setInitialValues({
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          minimumCGPA: job.minimumCGPA,
          deadline,
          description: job.description,
          requirements: job.requirements.join(", "),
          skillsRequired: job.skillsRequired.join(", "),
          eligibleBranches:
            job.eligibleBranches.join(", "),
        });
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ??
            "Failed to load job"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (
    values: JobFormValues
  ) => {
    if (!id) return;

    try {
      await updateJob(id, {
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

        skillsRequired:
          values.skillsRequired
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

        eligibleBranches:
          values.eligibleBranches
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      });

      toast.success("Job updated successfully");

      navigate(ROUTES.ADMIN.JOBS);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Failed to update job"
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!initialValues) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Job
        </h1>

        <p className="text-gray-500">
          Update the job details.
        </p>
      </div>

      <div className="rounded-xl bg-white p-8 shadow">
        <JobForm
          initialValues={initialValues}
          submitText="Update Job"
          onSubmit={handleSubmit}
          onCancel={() =>
            navigate(ROUTES.ADMIN.JOBS)
          }
          isEditing
        />
      </div>
    </div>
  );
};

export default EditJob;