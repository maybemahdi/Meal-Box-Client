/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Steps, Radio } from "antd";
import Image from "next/image";
import { CheckOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { useState } from "react";
import paypalLogo from "@/assets/images/Paypal.png";
import mastercard from "@/assets/images/Mastercard.png";
import visa from "@/assets/images/Visa.png";
import amex from "@/assets/images/Amex.png";

import { Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import StripeCardForm from "./StripeCardForm";
import { loadStripe } from "@stripe/stripe-js";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Loading from "@/components/shared/Loading/Loading";
import { current } from "@reduxjs/toolkit";
import Button from "@/components/shared/Button/Button";
import Link from "next/link";
import AddAddress from "./AddAddress";
import { useGetMyAddressQuery } from "@/redux/features/address/address.api";
import { useGetSingleMealQuery } from "@/redux/features/meal/meal.customer.api";
import { useMakePaymentMutation } from "@/redux/features/payment/payment.api";

const { Title, Text } = Typography;

const OrderMealPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mealId = searchParams.get("mealId");
  const pickupDate = localStorage.getItem("pickupDate");

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetMyAddressQuery(undefined);

  const {
    data: responseOfSingleMeal,
    isLoading: isSingleMealLoading,
    isFetching: isSingleMealFetching,
  } = useGetSingleMealQuery(mealId, {
    skip: !mealId,
  });
  const { data: me, isLoading: isMeLoading } = useGetMeQuery(undefined);

  const [makePayment] = useMakePaymentMutation();

  if (!mealId) {
    router.push("/shop");
  }

  if (
    isLoading ||
    isFetching ||
    isSingleMealLoading ||
    isSingleMealFetching ||
    isMeLoading
  ) {
    return <Loading />;
  }

  const myAddress = response?.data;
  const currentMeal = responseOfSingleMeal?.data;
  console.log(currentMeal);

  const handleContinue = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  // console.log(paymentMethod);
  // console.log(currentStep);

  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripeKey) {
    console.error(
      "Stripe publishable key is missing. Check your environment variables."
    );
  }

  const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

  const handleNextStep = async (paymentMethodId: string) => {
    console.log(paymentMethodId);
    setCurrentStep((prev) => prev + 1);
    const res = await handleAsyncWithToast(async () => {
      return makePayment({
        customerId: me?._id,
        mealId: mealId,
        customization: "Extra spicy, no dairy",
        schedule: pickupDate,
        deliveryAddress: `${myAddress?.houseNo}, ${myAddress?.pickupStreet}, ${myAddress?.city}, ${myAddress?.zipCode}`,
      });
    }, "Ordering...");
    if (res?.data?.success) {
      setCurrentStep((prev) => prev + 1);
      console.log(res?.data);
    }
  };

  return (
    <div className="w-[90%] mx-auto my-8 md:my-12">
      <div className="w-full md:w-4/5 mx-auto mb-8">
        <Steps
          current={currentStep}
          items={[
            {
              title: "Shipping Address",
              status: currentStep === 0 ? "process" : "finish",
              icon: currentStep > 0 ? <CheckOutlined /> : undefined,
            },
            {
              title: "Order Summary",
              status:
                currentStep === 1
                  ? "process"
                  : currentStep > 1
                  ? "finish"
                  : "wait",
              icon: currentStep > 1 ? <CheckOutlined /> : undefined,
            },
            {
              title: "Payment Method",
              status:
                currentStep === 2
                  ? "process"
                  : currentStep > 2
                  ? "finish"
                  : "wait",
              icon: currentStep > 2 ? <CheckOutlined /> : undefined,
            },
            {
              title: "Confirm Payment",
              status:
                currentStep === 3
                  ? "process"
                  : currentStep > 3
                  ? "finish"
                  : "wait",
              icon:
                currentStep > 3 ? (
                  <CheckOutlined />
                ) : currentStep > 3 ? (
                  "finish"
                ) : undefined,
            },
            {
              title: "Completed Payment",
              status:
                currentStep === 4
                  ? "process"
                  : currentStep > 4
                  ? "finish"
                  : "wait",
              icon: currentStep > 4 ? <CheckOutlined /> : undefined,
            },
          ]}
        />
      </div>

      {currentStep === 0 && <AddAddress setCurrentStep={setCurrentStep} />}
      {currentStep === 1 && (
        <div className="mx-auto w-full max-w-xl rounded-lg bg-white md:p-6 shadow-sm">
          <div className="flex gap-2 items-center justify-center mb-8">
            <h2 className="uppercase text-xl md:text-[32px] font-semibold text-primary">
              Summary
            </h2>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-base font-medium text-gray-700">
                Pickup Location
              </h2>
              <p className="text-primary">
                {`${myAddress?.houseNo}, ${myAddress?.pickupStreet}, ${myAddress?.zipCode}, ${myAddress?.city}`}
              </p>
            </div>

            <div className="text-center">
              <h2 className="mb-2 text-base font-medium text-gray-700">
                Zip code
              </h2>
              <p className="text-primary">{myAddress?.zipCode}</p>
            </div>

            <div className="text-center">
              <h2 className="mb-2 text-base font-medium text-gray-700">
                Your Pickup Date
              </h2>
              <p className="text-primary">{pickupDate}</p>
            </div>
            <div className="text-center">
              <h2 className="mb-2 text-base font-medium text-gray-700">
                Subtotal
              </h2>
              <p className="text-primary font-semibold">
                ${currentMeal?.price}
              </p>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <Button
              onClick={handleContinue}
              label="Next"
              variant="filled"
              fullWidth
            />
            <Button
              isDisabled={currentStep === Number(0)}
              onClick={handleBack}
              label="Back"
              variant="outline"
              fullWidth
            />
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="mt-12 p-8 rounded-lg max-w-lg mx-auto">
          <div className="w-full">
            <h2 className="text-[24px] md:text-[32px] text-center font-semibold text-primary mb-8">
              Payment Method
            </h2>
            <div className="space-y-4">
              <button
                onClick={handleContinue}
                className="flex w-full items-center justify-between rounded-full bg-gray-100 px-6 py-4 transition-colors hover:bg-gray-200"
              >
                <span className="text-lg text-gray-700">Pay with Stripe</span>
                <div className="flex items-center gap-2">
                  <Image
                    src={mastercard}
                    alt="Mastercard"
                    width={38}
                    height={24}
                    className="h-6 w-auto"
                  />
                  <Image
                    src={visa}
                    alt="Visa"
                    width={38}
                    height={24}
                    className="h-6 w-auto"
                  />
                  <Image
                    src={amex}
                    alt="American Express"
                    width={38}
                    height={24}
                    className="h-6 w-auto"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="mt-12 max-w-md mx-auto">
          {/* Headings */}
          <div className="text-center mb-6">
            <Title level={4} className="mb-0">
              Confirm Payment
            </Title>
            <Text type="secondary">
              Please confirm your payment details for the selected plan.
            </Text>
          </div>
          <Elements stripe={stripePromise}>
            <StripeCardForm handleNextStep={handleNextStep} />
          </Elements>
        </div>
      )}
      {currentStep === 4 && (
        <div className="sm:p-8 md:p-12 lg:p-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <path
                  d="M75.7461 46.6257L75.7228 46.6373C72.9806 48.7402 71.8188 52.3188 72.7948 55.6304L72.8064 55.6537C74.3633 60.9171 70.5059 66.2268 65.0216 66.3663H64.9984C61.5359 66.4593 58.4917 68.6668 57.3414 71.9318V71.9434C55.5055 77.1254 49.2547 79.1587 44.7348 76.033C41.9283 74.1166 38.2181 74.0166 35.2653 76.033H35.2537C30.7341 79.1469 24.483 77.1252 22.6588 71.9316C21.4981 68.6585 18.4584 66.459 15.0019 66.3662H14.9786C9.49453 66.2266 5.63688 60.917 7.19391 55.6535L7.20547 55.6302C8.18125 52.3187 7.01937 48.7401 4.2775 46.6371L4.25422 46.6255C-0.102969 43.2791 -0.102969 36.7262 4.25422 33.3799L4.2775 33.3684C7.01937 31.2654 8.18125 27.6866 7.19391 24.3752V24.352C5.62516 19.0887 9.49438 13.7787 14.9786 13.6393H15.0019C18.4527 13.5463 21.5084 11.3387 22.6588 8.07383V8.06226C24.4828 2.88023 30.7341 0.84695 35.2537 3.97258H35.2653C38.1119 5.93617 41.8764 5.93617 44.7348 3.97258C49.3002 0.819919 55.5163 2.91133 57.3414 8.06226V8.07383C58.4917 11.3271 61.5358 13.5465 64.9984 13.6393H65.0216C70.5058 13.7787 74.3633 19.0887 72.8064 24.352L72.7948 24.3752C71.8188 27.6866 72.9806 31.2654 75.7228 33.3684L75.7461 33.3799C80.1033 36.7262 80.1033 43.2793 75.7461 46.6257Z"
                  fill="#3EB655"
                />
                <path
                  d="M40.0007 61.6432C51.954 61.6432 61.644 51.9532 61.644 40C61.644 28.0467 51.954 18.3567 40.0007 18.3567C28.0474 18.3567 18.3574 28.0467 18.3574 40C18.3574 51.9532 28.0474 61.6432 40.0007 61.6432Z"
                  fill="#8BD399"
                />
                <path
                  opacity="0.1"
                  d="M56.6186 26.1459C52.875 23.0662 48.0855 21.2151 42.8643 21.2151C30.9111 21.2151 21.2158 30.9104 21.2158 42.8635C21.2158 48.0848 23.0669 52.8743 26.1464 56.6179C21.39 52.6502 18.3604 46.682 18.3604 39.9998C18.3604 28.0465 28.0474 18.3596 40.0005 18.3596C46.6827 18.3596 52.651 21.3893 56.6186 26.1459Z"
                  fill="black"
                />
                <path
                  d="M34.8514 48.4728L30.0654 43.381C28.8119 42.0472 28.8766 39.9502 30.2099 38.6967C31.5432 37.4417 33.6411 37.5091 34.8935 38.8419L37.1782 41.2716L46.8896 30.1719C48.0933 28.7944 50.1871 28.6547 51.5657 29.8602C52.9432 31.0656 53.0822 33.1588 51.8774 34.5363L39.7594 48.3855C38.4685 49.8594 36.1902 49.898 34.8514 48.4728Z"
                  fill="white"
                />
              </svg>
            </div>
            <h2 className="text-[30px] font-semibold text-title text-center mb-4">
              Your Order Has Been Completed!
            </h2>
            <p className="text-lg text-text-secondary max-w-md mb-4">
              Your order has been confirmed and is now being processed. Thank
              you for staying with us!
            </p>
            <p className="text-[#616161] font-semibold text-base mb-4">
              Order ID #3884885
            </p>
            <Link href={"/"}>
              <Button label="Go to Home" variant="outline" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderMealPage;
