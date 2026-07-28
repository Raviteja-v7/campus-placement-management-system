import { Formik, Form } from "formik";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { jobSchema } from "../../validation/jobSchema";

export interface JobFormValues {
  title: string;
  company: string;
  location: string;
  salary: number | "";
  minimumCGPA: number | "";
  deadline: string;
  description: string;
  requirements: string;
  skillsRequired: string;
  eligibleBranches: string;
}

interface JobFormProps {
  initialValues: JobFormValues;
  submitText: string;
  onSubmit: (values: JobFormValues) => Promise<void>;
  onCancel?: () => void;
}

const JobForm = ({
  initialValues,
  submitText,
  onSubmit,
  onCancel,
}: JobFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={jobSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        dirty,
      }) => (
        <Form className="space-y-4">
          <Input
            label="Job Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title ? errors.title : ""}
          />

          <Input
            label="Company"
            name="company"
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.company ? errors.company : ""}
          />

          <Input
            label="Location"
            name="location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location ? errors.location : ""}
          />

          <Input
            label="Salary"
            name="salary"
            type="number"
            value={values.salary}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.salary ? errors.salary : ""}
          />

          <Input
            label="Minimum CGPA"
            name="minimumCGPA"
            type="number"
            step="0.1"
            value={values.minimumCGPA}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.minimumCGPA ? errors.minimumCGPA : ""}
          />

          <Input
            label="Application Deadline"
            name="deadline"
            type="date"
            value={values.deadline}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.deadline ? errors.deadline : ""}
          />

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {touched.description && errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <Input
            label="Requirements (comma separated)"
            name="requirements"
            value={values.requirements}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Input
            label="Skills Required (comma separated)"
            name="skillsRequired"
            value={values.skillsRequired}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Input
            label="Eligible Branches (comma separated)"
            name="eligibleBranches"
            value={values.eligibleBranches}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className="flex justify-end gap-4 pt-4">
            {onCancel && (
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            )}

            <Button type="submit" disabled={isSubmitting || !dirty}>
              {isSubmitting
                ? "Updating..."
                : !dirty
                  ? "No Changes"
                  : submitText}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JobForm;
