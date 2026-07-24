import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-lg px-4 py-2 font-medium transition duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",

    secondary:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-300",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",

    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-400",

    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;