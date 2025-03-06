/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SessionProviderForNextAuth from "@/nextAuth/SessionProviderForNextAuth";
import ReduxStoreProvider from "@/redux/ReduxStoreProvider";
import { Toaster } from "sonner";
import MyContextProvider from "@/lib/MyContextProvider";
import ConfigProviderForAntd from "@/providers/ConfigProviderForAntd";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meal Box",
  description: "A Meal planner platform!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${poppins.className} antialiased`}
      >
        <MyContextProvider>
          {/* <SessionProviderForNextAuth> */}
          <ReduxStoreProvider>
            <ConfigProviderForAntd>
              <Toaster />
              {children}
            </ConfigProviderForAntd>
          </ReduxStoreProvider>
          {/* </SessionProviderForNextAuth> */}
        </MyContextProvider>
      </body>
    </html>
  );
}
