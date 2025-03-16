/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import React, { ReactNode } from "react";
import { CloseOutlined } from "@ant-design/icons";

interface IModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  children: ReactNode;
  maskClosable?: boolean;
  closable?: boolean;
  width?: any;
}

const MyModal = ({
  isModalOpen,
  handleCancel,
  children,
  maskClosable = true,
  closable = false,
  width,
}: IModalProps) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      centered
      footer={null}
      maskClosable={maskClosable}
      closable={closable}
      transitionName="ant-zoom"
      maskTransitionName="ant-fade"
      width={width}
      style={{maxWidth: "800px"}}
    >
      {/* Custom Close Button */}
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "-15px",
          background: "#059669",
          borderRadius: "50%",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "8px",
          paddingRight: "8px",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
        onClick={handleCancel}
      >
        <CloseOutlined style={{ fontSize: "18px", color: "#fff" }} />
      </div>
      <div
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </Modal>
  );
};

export default MyModal;
