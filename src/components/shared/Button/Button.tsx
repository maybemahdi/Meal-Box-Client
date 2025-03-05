import React from "react";
import { cn } from "@/lib/utils"; // Importing the utility function

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "outline" | "filled";
  fullWidth?: boolean;
  customBg?: string;
  customPY?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "filled",
  fullWidth,
  customBg,
  customPY,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...(customBg ? { backgroundColor: customBg } : {}),
        ...(customPY
          ? { paddingTop: `${customPY} 0`, paddingBottom: `${customPY} 0` }
          : {}),
      }}
      className={cn(
        "px-8 py-2 rounded-md text-base font-medium transition-all duration-300",
        {
          "border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white":
            variant === "outline",
          "bg-green-700 text-white hover:bg-green-800": variant === "filled",
          "w-full": fullWidth,
        }
      )}
    >
      {label}
    </button>
  );
};

export default Button;
