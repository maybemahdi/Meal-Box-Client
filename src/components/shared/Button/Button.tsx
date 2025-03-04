import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant: "outline" | "filled";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant,
  fullWidth,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-2 rounded-md text-base font-medium transition-all duration-300 ${
        variant === "outline"
          ? "border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
          : "bg-green-700 text-white hover:bg-green-800"
      } ${fullWidth && "w-full"}`}
    >
      {label}
    </button>
  );
};

export default Button;
