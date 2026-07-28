import { Formik, Form } from "formik";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { profileSchema } from "../../validation/profileSchema";
import type { CreateProfileRequest } from "../../types/profile";
import { useEffect, useState } from "react";

interface ProfileFormProps {
  initialValues: CreateProfileRequest;
  onSubmit: (values: CreateProfileRequest) => Promise<void>;
  isEditing?: boolean;
  hasFileChanges?: boolean;
}

const ProfileForm = ({
  initialValues,
  onSubmit,
  isEditing = false,
  hasFileChanges = false,
}: ProfileFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      enableReinitialize
      onSubmit={async (values, helpers) => {
        try {
          await onSubmit(values);
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        isSubmitting,
        dirty,
      }) => {
        const [skillsInput, setSkillsInput] = useState(
          values.skills.join(", "),
        );

        useEffect(() => {
          setSkillsInput(values.skills.join(", "));
        }, [values.skills]);

        return (
          <Form className="space-y-5">
            <Input
              label="Department"
              name="department"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Computer Science"
              error={touched.department ? errors.department : undefined}
            />

            <Input
              label="CGPA"
              name="cgpa"
              type="number"
              step="0.01"
              value={values.cgpa}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="8.50"
              error={touched.cgpa ? errors.cgpa : undefined}
            />

            <Input
              label="Phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="9876543210"
              error={touched.phone ? errors.phone : undefined}
            />

            <div>
              <label className="mb-2 block text-sm font-medium">
                Experience
              </label>

              <textarea
                name="experience"
                rows={5}
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Describe your internships, projects, achievements..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500"
              />

              {touched.experience && errors.experience && (
                <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
              )}
            </div>

            <Input
              label="Skills"
              name="skills"
              value={skillsInput}
              onBlur={handleBlur}
              onChange={(e) => {
                const value = e.target.value;

                setSkillsInput(value);

                setFieldValue(
                  "skills",
                  value
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
                );
              }}
              placeholder="React, Node.js, AWS, MongoDB"
              error={
                touched.skills && typeof errors.skills === "string"
                  ? errors.skills
                  : undefined
              }
            />

            <div className="flex justify-end gap-3 pt-4">
              {isEditing && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={
                  isSubmitting || (isEditing && !dirty && !hasFileChanges)
                }
                className={!isEditing ? "w-full" : ""}
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                    ? dirty || hasFileChanges
                      ? "Update Profile"
                      : "No Changes"
                    : "Create Profile"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
