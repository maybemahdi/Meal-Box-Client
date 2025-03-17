import React from "react";
import { cn } from "@/lib/utils"; // Importing the utility function

interface ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "outline" | "filled";
  fullWidth?: boolean;
  customBg?: string;
  customPY?: string;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "filled",
  fullWidth,
  customBg,
  customPY,
  type = "button",
  isDisabled = false,
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
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
          "px-[calc(2rem-1.7px)] py-[calc(0.5rem-1.7px)] border-2 border-primary text-primary hover:bg-primary hover:text-white":
            variant === "outline",
          "bg-primary text-white hover:bg-emerald-700": variant === "filled",
          "w-full": fullWidth,
        }
      )}
    >
      {label}
    </button>
  );
};

export default Button;
