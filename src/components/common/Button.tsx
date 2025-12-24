import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button = ({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const base =
    "px-4 py-2 rounded-lg font-medium transition disabled:opacity-50";

  const styles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  return (
    <button
      {...props}
      className={`${base} ${styles[variant]} ${className}`}
    />
  );
};

export default Button;
