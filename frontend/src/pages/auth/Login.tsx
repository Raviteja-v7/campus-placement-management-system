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
            <Card className="w-full max-w-md p-8">
                <h1 className="mb-8 text-center text-4xl font-bold text-slate-900">
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
                        <Form className="space-y-5">
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
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-4 flex items-center pt-7 text-gray-500 transition hover:text-blue-600"
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} />
                                    ) : (
                                        <FiEye size={20} />
                                    )}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting
                                    ? "Signing In..."
                                    : "Sign In"}
                            </Button>

                            <p className="text-center text-sm text-gray-600">
                                Don't have an account???{" "}
                                <Link
                                    to={ROUTES.SIGNUP}
                                    className="font-semibold text-blue-600 hover:underline"
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