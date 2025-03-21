/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const MyFormInput = ({
  type = "text",
  name,
  label,
  labelClassName,
  inputClassName,
  placeHolder,
  value,
  isPassword = false,
  onValueChange,
}: {
  type?: string;
  name: string;
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  placeHolder?: string;
  value?: any;
  isPassword?: boolean;
  onValueChange?: (newValue: any) => void;
}) => {
  const { setValue, control } = useFormContext();

  // Watch the input field's value
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    setValue(name, value, { shouldValidate: false });
  }, [value, name, setValue]);

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue); // Trigger the callback whenever the value changes
    }
  }, [inputValue, onValueChange]);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col justify-center w-full">
            {label && (
              <p
                className={cn(
                  "mb-2 text-text-secondary text-base font-normal leading-6",
                  labelClassName
                )}
              >
                {label}
              </p>
            )}
            <Form.Item style={{ marginBottom: "0px" }}>
              {isPassword ? (
                <Input.Password
                  {...field}
                  type={type}
                  id={name}
                  size="large"
                  className={cn(
                    "w-full focus:outline-0 focus:ring-0",
                    inputClassName
                  )}
                  placeholder={placeHolder}
                />
              ) : (
                <Input
                  {...field}
                  type={type}
                  id={name}
                  size="large"
                  className={cn(
                    "w-full focus:outline-0 focus:ring-0",
                    inputClassName
                  )}
                  placeholder={placeHolder}
                />
              )}
            </Form.Item>
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default MyFormInput;
