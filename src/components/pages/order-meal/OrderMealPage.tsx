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

const { Title, Text } = Typography;

const OrderMealPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mealId = searchParams.get("mealId");

  //   const { data: response, isLoading } = useGetSinglePlanQuery(planId, {
  //     skip: !planId,
  //   });
  //   const { data: me, isLoading: isMeLoading } = useGetMeQuery(undefined);

  //   const [makePayment] = useMakePaymentMutation();

  if (!mealId) {
    router.push("/shop");
  }

  //   if (isLoading || isMeLoading) {
  //     return <Loading />;
  //   }

  //   const plan = response?.data;
  //   console.log(plan);

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
    // const res = await handleAsyncWithToast(async () => {
    //   return makePayment({
    //     paymentMethodId: paymentMethodId,
    //     subscriptionPlanId: planId,
    //     name: `${me?.data?.member?.firstName} ${me?.data?.member?.lastName}`,
    //     email: me?.data?.member?.email,
    //   });
    // });
    // if (res?.data?.success) {
    //   setCurrentStep((prev) => prev + 1);
    //   console.log(res?.data);
    // }
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
            <h2 className="uppercase text-xl md:text-[32px] font-semibold text-primary">
              Pick up Address
            </h2>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2 text-base font-medium text-gray-700">
                Pickup Location
              </h2>
              <p className="text-gray-600">{"address"}</p>
              <p className="text-gray-600">{"instructions"}</p>
            </div>

            <div className="text-center">
              <h2 className="mb-2 text-base font-medium text-gray-700">
                Zip code
              </h2>
              <p className="text-gray-600">{"zipCode"}</p>
            </div>

            <div className="text-center">
              <h2 className="mb-2 text-base font-medium text-gray-700">
                Your Pickup Date
              </h2>
              <p className="text-gray-600">{"pickupDate"}</p>
              <p className="text-gray-600">{"pickupTimeRange"}</p>
            </div>

            <div className="text-center">
              <h2 className="mb-2 text-base font-medium text-gray-700">
                Order By
              </h2>
              <p className="text-gray-600">{"orderByDate"}</p>
            </div>
          </div>
          <div className="space-y-5 mt-6">
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
            <h2 className="text-[24px] md:text-[32px] text-center font-semibold uppercase text-primary mb-8">
              PAYMENT METHOD
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

              <button
                // onClick={onSelectPaypal}
                className="flex w-full items-center justify-between rounded-full bg-gray-100 px-6 py-4 transition-colors hover:bg-gray-200"
              >
                <span className="text-lg text-gray-700">Pay with Paypal</span>
                <Image
                  src={paypalLogo}
                  alt="PayPal"
                  width={80}
                  height={24}
                  className="h-6 w-auto"
                />
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
