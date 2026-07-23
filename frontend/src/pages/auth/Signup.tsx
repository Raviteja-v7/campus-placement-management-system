import { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { signupSchema } from "../../validation/signupSchema";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await signup(
                values.username,
                values.email,
                values.password
              );

              toast.success("Account created successfully!");

              navigate(ROUTES.LOGIN, { replace: true });
            } catch (error) {
              if (axios.isAxiosError(error)) {
                toast.error(
                  error.response?.data?.message ??
                    "Signup failed"
                );
              } else {
                toast.error("Something went wrong");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <Input
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.username
                    ? errors.username
                    : undefined
                }
              />

              <Input
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.email
                    ? errors.email
                    : undefined
                }
              />

              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={
                    showPassword ? "text" : "password"
                  }
                  autoComplete="new-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.password
                      ? errors.password
                      : undefined
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-9 text-sm text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="new-password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirmPassword
                      ? errors.confirmPassword
                      : undefined
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-9 text-sm text-blue-600"
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  to={ROUTES.LOGIN}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Signup;