import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
import { SelectProps } from "antd";
import { cn } from "@/lib/utils";

interface MyFormSelectProps {
  label?: string;
  labelClassName?: string;
  name: string;
  options?: SelectProps["options"];
  disabled?: boolean;
  mode?: "multiple" | "tags"; // these are the two modes supported by Ant Design's Select
  defaultValue?: string;
  placeHolder: string;
  className?: string;
  isSearch?: boolean;
}

const MyFormSelect = ({
  label,
  labelClassName,
  name,
  options,
  disabled,
  mode,
  defaultValue,
  placeHolder,
  className,
  isSearch = false,
}: MyFormSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col justify-center w-full">
          {/* Label */}
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

          {/* Ant Design Select */}
          <Form.Item style={{ marginBottom: "0px" }}>
            <Select
              mode={mode}
              style={{ width: "100%" }}
              className={cn(className, "ant-select")}
              {...field}
              ref={null}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              options={options}
              defaultValue={defaultValue}
              size="large"
              disabled={disabled}
              placeholder={placeHolder}
              showSearch={isSearch} // Enable search functionality based on isSearch prop
              filterOption={
                isSearch
                  ? (input, option) =>
                      (option?.label ?? "")
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                  : undefined
              }
              // filterSort={
              //   isSearch
              //     ? (optionA, optionB) =>
              //         (String(optionA?.label ?? "").toLowerCase()).localeCompare(
              //           String(optionB?.label ?? "").toLowerCase()
              //         )
              //     : undefined
              // }
            />

            {/* Error Message */}
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        </div>
      )}
    />
  );
};

export default MyFormSelect;
