"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/shared/Button/Button";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
// import { handleAsyncWithToast } from '@/utils/handleAsyncWithToast';
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "antd";
import dayjs from "dayjs";
// import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import {
  useCreateAddressMutation,
  useGetMyAddressQuery,
  useUpdateAddressMutation,
} from "@/redux/features/address/address.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import Loading from "@/components/shared/Loading/Loading";

const validationSchema = z.object({
  zipCode: z.string().min(1, "Zip code is required"),
  pickupStreet: z.string().min(1, "Pickup street is required"),
  houseNo: z.string().min(1, "House number is required"),
  city: z.string().min(1, "City is required"),
});

const AddAddress = ({
  setCurrentStep,
}: {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  const [pickupDate, setPickupDate] = useState<string>("");
  const [emptyDateError, setEmptyDateError] = useState("");

  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetMyAddressQuery(undefined);

  useEffect(() => {
    localStorage.setItem("pickupDate", pickupDate);
  }, [pickupDate]);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  const myAddress = response?.data;

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setPickupDate(date.format("YYYY-MM-DD"));
      setEmptyDateError("");
    } else {
      setPickupDate("");
    }
  };

  const handleSubmit = async (formData: any, reset: any) => {
    if (!pickupDate) {
      setEmptyDateError("Please select pickup date");
      return;
    }
    const payload = {
      ...formData,
    };

    if (!myAddress?._id) {
      const response = await handleAsyncWithToast(async () => {
        return createAddress(payload);
      }, "Adding Address...");
      if (response?.data?.success) {
        setCurrentStep((prev) => prev + 1);
        reset();
      }
    } else {
      const response = await handleAsyncWithToast(async () => {
        return updateAddress(payload);
      }, "Updating Address...");
      if (response?.data?.success) {
        setCurrentStep((prev) => prev + 1);
        reset();
      }
    }
  };

  return (
    <div className="px-5 flex flex-col justify-center max-w-xl w-full mx-auto">
      <div className="flex flex-col justify-center gap-10">
        <div className="flex gap-2 items-center justify-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M20 5C18.0222 5 16.0888 5.58649 14.4443 6.6853C12.7998 7.78412 11.5181 9.3459 10.7612 11.1732C10.0043 13.0004 9.8063 15.0111 10.1922 16.9509C10.578 18.8907 11.5304 20.6725 12.9289 22.0711C14.3275 23.4696 16.1093 24.422 18.0491 24.8079C19.9889 25.1937 21.9996 24.9957 23.8268 24.2388C25.6541 23.4819 27.2159 22.2002 28.3147 20.5557C29.4135 18.9112 30 16.9778 30 15C29.9965 12.3489 28.9418 9.80738 27.0672 7.93277C25.1926 6.05816 22.6511 5.00347 20 5ZM20 23.75C18.2694 23.75 16.5777 23.2368 15.1388 22.2754C13.6998 21.3139 12.5783 19.9473 11.9161 18.3485C11.2538 16.7496 11.0805 14.9903 11.4181 13.293C11.7558 11.5956 12.5891 10.0365 13.8128 8.81282C15.0365 7.58911 16.5956 6.75575 18.293 6.41813C19.9903 6.08051 21.7496 6.25379 23.3485 6.91605C24.9473 7.57832 26.3139 8.69983 27.2754 10.1388C28.2368 11.5777 28.75 13.2694 28.75 15C28.7475 17.3199 27.8249 19.544 26.1844 21.1844C24.544 22.8249 22.3199 23.7475 20 23.75Z"
                fill="#1F6306"
              />
              <path
                d="M24.2375 31.4375C28.1812 27.0187 33.75 19.9062 33.75 15C33.75 11.3533 32.3013 7.85591 29.7227 5.27728C27.1441 2.69866 23.6467 1.25 20 1.25C16.3533 1.25 12.8559 2.69866 10.2773 5.27728C7.69866 7.85591 6.25 11.3533 6.25 15C6.25 19.9062 11.8187 27.0187 15.7625 31.4375C12.8312 31.7062 6.875 32.5562 6.875 35C6.875 37.575 13.6813 38.75 20 38.75C26.3188 38.75 33.125 37.575 33.125 35C33.125 32.5562 27.1687 31.7062 24.2375 31.4375ZM7.5 15C7.5 11.6848 8.81696 8.50537 11.1612 6.16117C13.5054 3.81696 16.6848 2.5 20 2.5C23.3152 2.5 26.4946 3.81696 28.8388 6.16117C31.183 8.50537 32.5 11.6848 32.5 15C32.5 21.175 22.2563 31.8438 20 34.1188C17.7437 31.8438 7.5 21.175 7.5 15ZM20 37.5C12.3187 37.5 8.125 35.85 8.125 35C8.125 34.375 10.7625 33.0062 16.8188 32.6062C18.3188 34.2312 19.4125 35.3 19.5625 35.45C19.6805 35.5623 19.8371 35.625 20 35.625C20.1629 35.625 20.3195 35.5623 20.4375 35.45C20.5875 35.3 21.6812 34.2312 23.1812 32.6062C29.2375 33.0062 31.875 34.375 31.875 35C31.875 35.85 27.6812 37.5 20 37.5Z"
                fill="#1F6306"
              />
              <path
                d="M25.6063 12.35L24.9813 9.85C24.9478 9.7145 24.8699 9.59411 24.76 9.50802C24.6501 9.42194 24.5146 9.37511 24.375 9.375H15.625C15.4854 9.37511 15.3499 9.42194 15.24 9.50802C15.1301 9.59411 15.0522 9.7145 15.0188 9.85L14.3938 12.35C14.3837 12.3994 14.3774 12.4496 14.375 12.5V20C14.375 20.1658 14.4408 20.3247 14.5581 20.4419C14.6753 20.5592 14.8342 20.625 15 20.625H25C25.1658 20.625 25.3247 20.5592 25.4419 20.4419C25.5592 20.3247 25.625 20.1658 25.625 20V12.5C25.6226 12.4496 25.6164 12.3994 25.6063 12.35ZM21.875 10.625H23.8875L24.2 11.875H21.875V10.625ZM19.375 10.625H20.625V11.875H19.375V10.625ZM19.375 13.125H20.625V14.375H19.375V13.125ZM16.1125 10.625H18.125V11.875H15.8L16.1125 10.625ZM24.375 19.375H15.625V13.125H18.125V15C18.125 15.1658 18.1908 15.3247 18.3081 15.4419C18.4253 15.5592 18.5842 15.625 18.75 15.625H21.25C21.4158 15.625 21.5747 15.5592 21.6919 15.4419C21.8092 15.3247 21.875 15.1658 21.875 15V13.125H24.375V19.375Z"
                fill="#1F6306"
              />
              <path
                d="M21.25 17.5C21.0842 17.5 20.9253 17.5658 20.8081 17.6831C20.6908 17.8003 20.625 17.9592 20.625 18.125C20.625 18.2908 20.6908 18.4497 20.8081 18.5669C20.9253 18.6842 21.0842 18.75 21.25 18.75H23.125C23.2908 18.75 23.4497 18.6842 23.5669 18.5669C23.6842 18.4497 23.75 18.2908 23.75 18.125C23.75 17.9592 23.6842 17.8003 23.5669 17.6831C23.4497 17.5658 23.2908 17.5 23.125 17.5H21.25Z"
                fill="#1F6306"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-[32px] font-semibold text-primary">
            Pick up Address
          </h2>
        </div>
        <MyFormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(validationSchema)}
          className="space-y-3"
        >
          <div className="space-y-5">
            <MyFormInput
              value={myAddress?.zipCode}
              name="zipCode"
              label="Zip Code"
            />
            <MyFormInput
              value={myAddress?.pickupStreet}
              name="pickupStreet"
              label="Pickup Street"
            />
            <MyFormInput
              value={myAddress?.houseNo}
              name="houseNo"
              label="House No"
            />
            <MyFormInput value={myAddress?.city} name="city" label="City" />
            <div className="w-full space-y-2">
              <label className="ps-1 text-text-secondary text-base font-normal leading-6">
                Click To Select Your Pickup Date
              </label>
              <DatePicker
                style={{
                  width: "100%",
                  borderColor: "#d1d5db",
                  color: "#5b5454",
                  padding: "10px",
                  borderRadius: "8px",
                }}
                onChange={handleDateChange}
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
              {emptyDateError && (
                <small style={{ color: "red" }}>{emptyDateError}</small>
              )}
            </div>
          </div>
          <Button
            label={myAddress ? "Update Address" : "Save Address"}
            type="submit"
            fullWidth
          />
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default AddAddress;
