"use client"
import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const ConfigProviderForAntd = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#059669",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ConfigProviderForAntd;
