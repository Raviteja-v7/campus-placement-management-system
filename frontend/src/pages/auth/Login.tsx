import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import { loginSchema } from "../../validation/loginSchema";
import { useAuth } from "../../hooks/useAuth";

import { ROUTES } from "../../constants/routes";

const Login = () => {
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    Login
                </h1>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await login(values.email, values.password);

                            toast.success("Login successful!");
                        } catch (error) {
                            if (axios.isAxiosError(error)) {
                                toast.error(
                                    error.response?.data?.message ??
                                        "Login failed"
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
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    autoComplete="current-password"
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
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Signing In..."
                                    : "Sign In"}
                            </Button>

                            <p className="mt-4 text-center text-sm">
                                Don't have an account?{" "}
                                <Link
                                    to={ROUTES.SIGNUP}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default Login;