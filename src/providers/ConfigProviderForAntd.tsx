"use client"
import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const ConfigProviderForAntd = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#15803D",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ConfigProviderForAntd;
